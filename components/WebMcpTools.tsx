"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createScheduleHandlers, webMcpHandlers } from "@/lib/webmcp/handlers";
import type { SessionLevel } from "@/lib/types";
import { useSchedule } from "./ScheduleProvider";

const sessionLevels: SessionLevel[] = ["beginner", "intermediate", "advanced"];

function createWebMcpTools(
  scheduleHandlers: ReturnType<typeof createScheduleHandlers>,
): WebMcpTool[] {
  return [
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
      description: "Get one DevFest session and its speaker by session ID.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string", description: "The session ID." } },
        required: ["id"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: webMcpHandlers.getSession,
    },
    {
      name: "search_sessions",
      title: "Search sessions",
      description: "Search sessions by title, description, room, or topic.",
      inputSchema: {
        type: "object",
        properties: { query: { type: "string", description: "The search query." } },
        required: ["query"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: webMcpHandlers.searchSessions,
    },
    {
      name: "filter_sessions_by_topic",
      title: "Filter sessions by topic",
      description: "List sessions matching a topic such as AI, Web, Cloud, or Security.",
      inputSchema: {
        type: "object",
        properties: { topic: { type: "string", description: "The topic to match." } },
        required: ["topic"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: webMcpHandlers.filterSessionsByTopic,
    },
    {
      name: "filter_sessions_by_level",
      title: "Filter sessions by level",
      description: "List sessions for the beginner, intermediate, or advanced level.",
      inputSchema: {
        type: "object",
        properties: {
          level: { type: "string", enum: sessionLevels, description: "The session level." },
        },
        required: ["level"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: webMcpHandlers.filterSessionsByLevel,
    },
    {
      name: "filter_sessions_by_time",
      title: "Filter sessions by time",
      description: "List sessions that fit within a valid HH:mm time range.",
      inputSchema: {
        type: "object",
        properties: {
          startTime: { type: "string", description: "Range start in HH:mm format." },
          endTime: { type: "string", description: "Range end in HH:mm format." },
        },
        required: ["startTime", "endTime"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: webMcpHandlers.filterSessionsByTime,
    },
    {
      name: "get_all_speakers",
      title: "Get all speakers",
      description: "List all DevFest speakers and their profiles.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: webMcpHandlers.getAllSpeakers,
    },
    {
      name: "get_speaker",
      title: "Get speaker",
      description: "Get one speaker by ID, including their sessions.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string", description: "The speaker ID." } },
        required: ["id"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: webMcpHandlers.getSpeaker,
    },
    {
      name: "get_sessions_by_speaker",
      title: "Get sessions by speaker",
      description: "List all sessions presented by a speaker ID.",
      inputSchema: {
        type: "object",
        properties: { speakerId: { type: "string", description: "The speaker ID." } },
        required: ["speakerId"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: webMcpHandlers.getSessionsBySpeaker,
    },
    {
      name: "get_my_schedule",
      title: "Get my schedule",
      description: "List sessions currently saved in the user's schedule.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: webMcpHandlers.getMySchedule,
    },
    {
      name: "check_schedule_conflict",
      title: "Check schedule conflict",
      description: "Find saved sessions that overlap with a session ID.",
      inputSchema: {
        type: "object",
        properties: { sessionId: { type: "string", description: "The session ID to check." } },
        required: ["sessionId"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: webMcpHandlers.checkScheduleConflict,
    },
    {
      name: "find_free_slots",
      title: "Find free slots",
      description: "Find open time slots between 09:00 and 18:00 in the saved schedule.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: webMcpHandlers.findFreeSlots,
    },
    {
      name: "add_to_schedule",
      title: "Add session to schedule",
      description: "Add a session to the user's schedule and return resulting conflicts.",
      inputSchema: {
        type: "object",
        properties: { sessionId: { type: "string", description: "The session ID to add." } },
        required: ["sessionId"],
        additionalProperties: false,
      },
      annotations: { consequentialHint: true },
      execute: scheduleHandlers.addToSchedule,
    },
    {
      name: "remove_from_schedule",
      title: "Remove session from schedule",
      description: "Remove a session from the user's saved schedule.",
      inputSchema: {
        type: "object",
        properties: { sessionId: { type: "string", description: "The session ID to remove." } },
        required: ["sessionId"],
        additionalProperties: false,
      },
      annotations: { consequentialHint: true },
      execute: scheduleHandlers.removeFromSchedule,
    },
    {
      name: "clear_schedule",
      title: "Clear schedule",
      description: "Remove all sessions from the user's saved schedule.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { consequentialHint: true },
      execute: scheduleHandlers.clearSchedule,
    },
    {
      name: "open_session",
      title: "Open session",
      description: "Navigate to a session detail page by session ID.",
      inputSchema: {
        type: "object",
        properties: { sessionId: { type: "string", description: "The session ID to open." } },
        required: ["sessionId"],
        additionalProperties: false,
      },
      execute: scheduleHandlers.openSession,
    },
  ];
}

export function WebMcpTools() {
  const router = useRouter();
  const { add, remove, clear } = useSchedule();

  useEffect(() => {
    const modelContext = document.modelContext;
    if (!modelContext) return;

    const scheduleHandlers = createScheduleHandlers({
      add,
      remove,
      clear,
      openSession: (url) => router.push(url),
    });
    const controller = new AbortController();

    for (const tool of createWebMcpTools(scheduleHandlers)) {
      void modelContext
        .registerTool(tool, { signal: controller.signal })
        .catch((error: unknown) => {
          if (!controller.signal.aborted) {
            console.error(`Failed to register WebMCP tool: ${tool.name}`, error);
          }
        });
    }

    return () => controller.abort();
  }, [add, clear, remove, router]);

  return null;
}
