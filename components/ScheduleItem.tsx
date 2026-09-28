"use client";
import Link from "next/link";
import { useSchedule } from "./ScheduleProvider";
import type { Session } from "@/lib/types";
export function ScheduleItem({ session, conflicts }: { session: Session; conflicts: Session[] }) {
  const { remove } = useSchedule();
  return (
    <article className="schedule-item">
      <div className="schedule-time">
        {session.startTime}
        <br />
        {session.endTime}
      </div>
      <div>
        <h2>
          <Link href={`/sessions/${session.id}`}>{session.title}</Link>
        </h2>
        <p>{session.room}</p>
      </div>
      <button type="button" className="button secondary small" onClick={() => remove(session.id)}>
        Remove
      </button>
      {conflicts.length > 0 && (
        <div className="conflict-note">
          ⚠ Overlaps with {conflicts.map((item) => item.title).join(", ")}
        </div>
      )}
    </article>
  );
}
