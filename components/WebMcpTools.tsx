"use client";

import { useEffect } from "react";
import { webMcpHandlers } from "@/lib/webmcp/handlers";

const tools: WebMcpTool[] = [
  {
    name: "get_all_sessions",
    title: "Get all sessions",
    description: "List DevFest sessions with their IDs, times, rooms, levels, and topics.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true },
    execute: webMcpHandlers.getAllSessions,
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
    execute: webMcpHandlers.getSession,
  },
];

// TODO: Register search_sessions using webMcpHandlers.searchSessions.
// TODO: Register filter_sessions_by_topic using webMcpHandlers.filterSessionsByTopic.
// TODO: Register filter_sessions_by_level using webMcpHandlers.filterSessionsByLevel.
// TODO: Register filter_sessions_by_time using webMcpHandlers.filterSessionsByTime.
// TODO: Register get_sessions_by_speaker using webMcpHandlers.getSessionsBySpeaker.
// TODO: Register get_all_speakers using webMcpHandlers.getAllSpeakers.
// TODO: Register get_speaker using webMcpHandlers.getSpeaker.
// TODO: Register get_my_schedule using webMcpHandlers.getMySchedule.
// TODO: Register check_schedule_conflict using webMcpHandlers.checkScheduleConflict.
// TODO: Register find_free_slots using webMcpHandlers.findFreeSlots.
// TODO: Register add_to_schedule using createScheduleHandlers and sync the ScheduleProvider UI.
// TODO: Register remove_from_schedule using createScheduleHandlers and sync the ScheduleProvider UI.
// TODO: Register clear_schedule using createScheduleHandlers and sync the ScheduleProvider UI.
// TODO: Register open_session using createScheduleHandlers and the Next.js router.

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
