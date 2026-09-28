"use client";

import { useEffect } from "react";
import { getAllSessions, getSessionById } from "@/lib/sessions";
import { getSpeakerInfo } from "@/lib/speakers";

const tools: WebMcpTool[] = [
  {
    name: "get_all_sessions",
    title: "Get all sessions",
    description: "List DevFest sessions with their IDs, times, rooms, levels, and topics.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true },
    execute: async (_input, { signal }) => {
      signal.throwIfAborted();
      const sessions = getAllSessions();
      return { count: sessions.length, sessions };
    },
  },
  {
    name: "get_session",
    title: "Get session",
    description:
      "Get one DevFest session and its speaker by session ID. Use get_all_sessions to find IDs.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string", description: "The session ID." } },
      required: ["id"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: async (input, { signal }) => {
      signal.throwIfAborted();
      const id = typeof input.id === "string" ? input.id.trim() : "";
      const session = id ? getSessionById(id) : undefined;
      if (!session) return { found: false, error: "Session not found." };
      return {
        found: true,
        session,
        speaker: getSpeakerInfo(session.speakerId),
        url: `/sessions/${encodeURIComponent(session.id)}`,
      };
    },
  },
];

// TODO: Register search_sessions using searchSessions for title, description, room, and topic queries.
// TODO: Register filter_sessions_by_topic using filterSessionsByTopic.
// TODO: Register filter_sessions_by_level using filterSessionsByLevel.
// TODO: Register filter_sessions_by_time using filterSessionsByTime, with validated HH:mm inputs.
// TODO: Register get_sessions_by_speaker using getSessionsBySpeaker.
// TODO: Register get_all_speakers using getAllSpeakers.
// TODO: Register get_speaker using getSpeakerInfo.
// TODO: Register get_my_schedule using getMySchedule.
// TODO: Register check_schedule_conflict using checkScheduleConflict.
// TODO: Register find_free_slots using findFreeSlots.
// TODO: Register add_to_schedule using addToSchedule and sync the ScheduleProvider UI.
// TODO: Register remove_from_schedule using removeFromSchedule and sync the ScheduleProvider UI.
// TODO: Register clear_schedule using clearSchedule and sync the ScheduleProvider UI.
// TODO: Register open_session separately if agent-driven navigation is needed; keep get_session read-only.

export function WebMcpTools() {
  useEffect(() => {
    const modelContext = document.modelContext;
    if (!modelContext) return;

    const controller = new AbortController();
    for (const tool of tools) {
      void modelContext
        .registerTool(tool, { signal: controller.signal })
        .catch((error: unknown) => {
          if (!controller.signal.aborted) {
            console.error(`Failed to register WebMCP tool: ${tool.name}`, error);
          }
        });
    }

    return () => controller.abort();
  }, []);

  return null;
}
