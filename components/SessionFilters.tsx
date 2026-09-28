"use client";

import { useMemo, useState } from "react";
import { getAllSessions, searchSessions } from "@/lib/sessions";
import { toMinutes } from "@/lib/time";
import type { SessionLevel } from "@/lib/types";
import { SessionList } from "./SessionList";

const topics = ["AI", "Web", "Backend", "Cloud", "Mobile", "DevOps", "Security"];
export function SessionFilters({ initialTopic = "" }: { initialTopic?: string }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState(initialTopic);
  const [level, setLevel] = useState<SessionLevel | "">("");
  const [time, setTime] = useState("");
  const filtered = useMemo(() => {
    const base = query ? searchSessions(query) : getAllSessions();
    return base.filter(
      (session) =>
        (!topic || session.topics.includes(topic)) &&
        (!level || session.level === level) &&
        (!time ||
          (toMinutes(session.startTime) >= toMinutes(time) &&
            toMinutes(session.startTime) < toMinutes(time) + 120)),
    );
  }, [query, topic, level, time]);
  return (
    <>
      <div className="filters" aria-label="Session filters">
        <div className="field">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            className="input"
            type="search"
            placeholder="Title, topic, room…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="topic">Topic</label>
          <select
            id="topic"
            className="input"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          >
            <option value="">All topics</option>
            {topics.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="level">Level</label>
          <select
            id="level"
            className="input"
            value={level}
            onChange={(event) => setLevel(event.target.value as SessionLevel | "")}
          >
            <option value="">All levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="time">Starting around</label>
          <select
            id="time"
            className="input"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          >
            <option value="">Any time</option>
            <option value="09:00">Morning · 09:00</option>
            <option value="11:00">Midday · 11:00</option>
            <option value="13:00">Afternoon · 13:00</option>
            <option value="15:00">Late · 15:00</option>
          </select>
        </div>
      </div>
      <p className="results-meta">
        {filtered.length} {filtered.length === 1 ? "session" : "sessions"}
      </p>
      <SessionList sessions={filtered} />
    </>
  );
}
