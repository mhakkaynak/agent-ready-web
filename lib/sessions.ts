import { sessions } from "./data";
import { toMinutes } from "./time";
import type { Session, SessionLevel } from "./types";

export function getAllSessions(): Session[] {
  return [...sessions];
}
export function getSessionById(sessionId: string): Session | undefined {
  return sessions.find((session) => session.id === sessionId);
}
export function searchSessions(query: string): Session[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return getAllSessions();
  return sessions.filter((session) =>
    [session.title, session.description, session.room, ...session.topics].some((value) =>
      value.toLowerCase().includes(normalized),
    ),
  );
}
export function filterSessionsByTopic(topic: string): Session[] {
  if (!topic) return getAllSessions();
  return sessions.filter((session) =>
    session.topics.some((item) => item.toLowerCase() === topic.toLowerCase()),
  );
}
export function filterSessionsByLevel(level: SessionLevel | ""): Session[] {
  if (!level) return getAllSessions();
  return sessions.filter((session) => session.level === level);
}
export function filterSessionsByTime(startTime: string, endTime: string): Session[] {
  const start = toMinutes(startTime);
  const end = toMinutes(endTime);
  return sessions.filter(
    (session) => toMinutes(session.startTime) >= start && toMinutes(session.endTime) <= end,
  );
}
export function getSessionsBySpeaker(speakerId: string): Session[] {
  return sessions.filter((session) => session.speakerId === speakerId);
}
