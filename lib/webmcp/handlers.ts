import {
  checkScheduleConflict,
  findFreeSlots,
  filterSessionsByLevel,
  filterSessionsByTime,
  filterSessionsByTopic,
  getAllSessions,
  getSessionById,
  getSessionsBySpeaker,
  getSpeakerInfo,
  getAllSpeakers,
  getMySchedule,
  searchSessions,
} from "@/lib";
import type { Session, SessionLevel } from "@/lib/types";

type ToolInput = Record<string, unknown>;
type ToolSignal = { signal: AbortSignal };
type ToolExecution = (input: ToolInput, options: ToolSignal) => Promise<unknown>;

const sessionLevels: SessionLevel[] = ["beginner", "intermediate", "advanced"];

function readString(input: ToolInput, key: string): string {
  return typeof input[key] === "string" ? input[key].trim() : "";
}

function isValidTime(value: string): boolean {
  return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function isSessionLevel(value: string): value is SessionLevel {
  return sessionLevels.includes(value as SessionLevel);
}

function sessionResult(sessions: Session[]) {
  return { count: sessions.length, sessions };
}

export const webMcpHandlers = {
  getAllSessions: async (_input: ToolInput, { signal }: ToolSignal) => {
    signal.throwIfAborted();
    return sessionResult(getAllSessions());
  },

  getSession: async (input: ToolInput, { signal }: ToolSignal) => {
    signal.throwIfAborted();
    const id = readString(input, "id");
    const session = id ? getSessionById(id) : undefined;
    if (!session) return { found: false, error: "Session not found." };
    return {
      found: true,
      session,
      speaker: getSpeakerInfo(session.speakerId),
      url: `/sessions/${encodeURIComponent(session.id)}`,
    };
  },

  searchSessions: async (input: ToolInput, { signal }: ToolSignal) => {
    signal.throwIfAborted();
    return sessionResult(searchSessions(readString(input, "query")));
  },

  filterSessionsByTopic: async (input: ToolInput, { signal }: ToolSignal) => {
    signal.throwIfAborted();
    const topic = readString(input, "topic");
    if (!topic) return { count: 0, sessions: [], error: "Topic is required." };
    return sessionResult(filterSessionsByTopic(topic));
  },

  filterSessionsByLevel: async (input: ToolInput, { signal }: ToolSignal) => {
    signal.throwIfAborted();
    const level = readString(input, "level");
    if (!isSessionLevel(level)) {
      return {
        count: 0,
        sessions: [],
        error: "Level must be beginner, intermediate, or advanced.",
      };
    }
    return sessionResult(filterSessionsByLevel(level));
  },

  filterSessionsByTime: async (input: ToolInput, { signal }: ToolSignal) => {
    signal.throwIfAborted();
    const startTime = readString(input, "startTime");
    const endTime = readString(input, "endTime");
    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      return { count: 0, sessions: [], error: "Both times must use valid HH:mm format." };
    }
    if (startTime >= endTime) {
      return { count: 0, sessions: [], error: "startTime must be before endTime." };
    }
    return sessionResult(filterSessionsByTime(startTime, endTime));
  },

  getAllSpeakers: async (_input: ToolInput, { signal }: ToolSignal) => {
    signal.throwIfAborted();
    const speakers = getAllSpeakers();
    return { count: speakers.length, speakers };
  },

  getSpeaker: async (input: ToolInput, { signal }: ToolSignal) => {
    signal.throwIfAborted();
    const id = readString(input, "id");
    const speaker = id ? getSpeakerInfo(id) : undefined;
    if (!speaker) return { found: false, error: "Speaker not found." };
    return { found: true, speaker, sessions: getSessionsBySpeaker(speaker.id) };
  },

  getSessionsBySpeaker: async (input: ToolInput, { signal }: ToolSignal) => {
    signal.throwIfAborted();
    const speakerId = readString(input, "speakerId");
    if (!getSpeakerInfo(speakerId)) {
      return { count: 0, sessions: [], error: "Speaker not found." };
    }
    return sessionResult(getSessionsBySpeaker(speakerId));
  },

  getMySchedule: async (_input: ToolInput, { signal }: ToolSignal) => {
    signal.throwIfAborted();
    return sessionResult(getMySchedule());
  },

  checkScheduleConflict: async (input: ToolInput, { signal }: ToolSignal) => {
    signal.throwIfAborted();
    const sessionId = readString(input, "sessionId");
    if (!getSessionById(sessionId)) {
      return { found: false, conflicts: [], error: "Session not found." };
    }
    const conflicts = checkScheduleConflict(sessionId);
    return { found: true, hasConflict: conflicts.length > 0, conflicts };
  },

  findFreeSlots: async (_input: ToolInput, { signal }: ToolSignal) => {
    signal.throwIfAborted();
    const freeSlots = findFreeSlots();
    return { count: freeSlots.length, freeSlots };
  },
} satisfies Record<string, ToolExecution>;

type ScheduleHandlerDependencies = {
  add: (sessionId: string) => void;
  remove: (sessionId: string) => void;
  clear: () => void;
  openSession: (url: string) => void;
};

export function createScheduleHandlers({
  add,
  remove,
  clear,
  openSession,
}: ScheduleHandlerDependencies) {
  return {
    addToSchedule: async (input: ToolInput, { signal }: ToolSignal) => {
      signal.throwIfAborted();
      const sessionId = readString(input, "sessionId");
      const session = getSessionById(sessionId);
      if (!session) return { added: false, error: "Session not found." };
      add(sessionId);
      return {
        added: true,
        session,
        conflicts: checkScheduleConflict(sessionId),
        schedule: getMySchedule(),
      };
    },

    removeFromSchedule: async (input: ToolInput, { signal }: ToolSignal) => {
      signal.throwIfAborted();
      const sessionId = readString(input, "sessionId");
      if (!getSessionById(sessionId)) return { removed: false, error: "Session not found." };
      remove(sessionId);
      return { removed: true, sessionId, schedule: getMySchedule() };
    },

    clearSchedule: async (_input: ToolInput, { signal }: ToolSignal) => {
      signal.throwIfAborted();
      clear();
      return { cleared: true, schedule: [] };
    },

    openSession: async (input: ToolInput, { signal }: ToolSignal) => {
      signal.throwIfAborted();
      const sessionId = readString(input, "sessionId");
      if (!getSessionById(sessionId)) return { opened: false, error: "Session not found." };
      const url = `/sessions/${encodeURIComponent(sessionId)}`;
      openSession(url);
      return { opened: true, url };
    },
  } satisfies Record<string, ToolExecution>;
}
