import { getAllSessions, getSessionById } from "./sessions";
import { timesOverlap, toMinutes, toTime } from "./time";
import type { Session, TimeSlot } from "./types";

export const SCHEDULE_STORAGE_KEY = "devfest-session-planner:schedule";
export const CONFERENCE_START = "09:00";
export const CONFERENCE_END = "18:00";

function readScheduleIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(SCHEDULE_STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeScheduleIds(ids: string[]): void {
  if (typeof window !== "undefined")
    window.localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(ids));
}

export function addToSchedule(sessionId: string): Session[] {
  if (!getSessionById(sessionId)) return getMySchedule();
  const ids = readScheduleIds();
  if (!ids.includes(sessionId)) writeScheduleIds([...ids, sessionId]);
  return getMySchedule();
}

export function removeFromSchedule(sessionId: string): Session[] {
  writeScheduleIds(readScheduleIds().filter((id) => id !== sessionId));
  return getMySchedule();
}

export function getMySchedule(): Session[] {
  const selectedIds = new Set(readScheduleIds());
  return getAllSessions()
    .filter((session) => selectedIds.has(session.id))
    .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));
}

export function checkScheduleConflict(sessionId: string): Session[] {
  const target = getSessionById(sessionId);
  if (!target) return [];
  return getMySchedule().filter(
    (session) =>
      session.id !== target.id &&
      timesOverlap(target.startTime, target.endTime, session.startTime, session.endTime),
  );
}

export function findFreeSlots(): TimeSlot[] {
  const dayStart = toMinutes(CONFERENCE_START);
  const dayEnd = toMinutes(CONFERENCE_END);
  const intervals = getMySchedule()
    .map((session) => ({
      start: Math.max(dayStart, toMinutes(session.startTime)),
      end: Math.min(dayEnd, toMinutes(session.endTime)),
    }))
    .filter((slot) => slot.end > dayStart && slot.start < dayEnd)
    .sort((a, b) => a.start - b.start);
  const merged: { start: number; end: number }[] = [];
  for (const interval of intervals) {
    const last = merged.at(-1);
    if (last && interval.start <= last.end) last.end = Math.max(last.end, interval.end);
    else merged.push({ ...interval });
  }
  const freeSlots: TimeSlot[] = [];
  let cursor = dayStart;
  for (const interval of merged) {
    if (interval.start > cursor)
      freeSlots.push({ startTime: toTime(cursor), endTime: toTime(interval.start) });
    cursor = Math.max(cursor, interval.end);
  }
  if (cursor < dayEnd) freeSlots.push({ startTime: toTime(cursor), endTime: toTime(dayEnd) });
  return freeSlots;
}

export function clearSchedule(): Session[] {
  writeScheduleIds([]);
  return [];
}
