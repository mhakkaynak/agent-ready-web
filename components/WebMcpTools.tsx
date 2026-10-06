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

// TODO: search_sessions
// TODO: filter_sessions_by_topic
// TODO: filter_sessions_by_level
// TODO: filter_sessions_by_time
// TODO: get_sessions_by_speaker
// TODO: get_all_speakers
// TODO: get_speaker
// TODO: get_my_schedule
// TODO: check_schedule_conflict
// TODO: find_free_slots
// TODO: add_to_schedule
// TODO: remove_from_schedule
// TODO: clear_schedule
// TODO: open_session

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
