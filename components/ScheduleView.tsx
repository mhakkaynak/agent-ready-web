"use client";
import Link from "next/link";
import { findFreeSlots } from "@/lib/schedule";
import { timesOverlap } from "@/lib/time";
import { ScheduleItem } from "./ScheduleItem";
import { useSchedule } from "./ScheduleProvider";
export function ScheduleView() {
  const { schedule, ready, clear } = useSchedule();
  const freeSlots = ready ? findFreeSlots() : [];
  if (!ready)
    return (
      <div className="schedule-empty">
        <p>Loading your schedule…</p>
      </div>
    );
  if (schedule.length === 0)
    return (
      <div className="schedule-empty">
        <h2>Your schedule is open</h2>
        <p>Add a few sessions and we’ll organize the day here.</p>
        <Link className="button" href="/sessions">
          Browse sessions
        </Link>
      </div>
    );
  return (
    <div className="schedule-layout">
      <div className="schedule-list">
        {schedule.map((session) => (
          <ScheduleItem
            key={session.id}
            session={session}
            conflicts={schedule.filter(
              (other) =>
                other.id !== session.id &&
                timesOverlap(session.startTime, session.endTime, other.startTime, other.endTime),
            )}
          />
        ))}
      </div>
      <aside className="side-panel">
        <h2>Free time</h2>
        <ul className="free-slots">
          {freeSlots.map((slot) => (
            <li key={`${slot.startTime}-${slot.endTime}`}>
              <span>{slot.startTime}</span>
              <span>to</span>
              <span>{slot.endTime}</span>
            </li>
          ))}
        </ul>
        <div className="panel-divider" />
        <button type="button" className="button danger small" onClick={clear}>
          Clear schedule
        </button>
      </aside>
    </div>
  );
}
