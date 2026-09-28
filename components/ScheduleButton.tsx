"use client";
import { useSchedule } from "./ScheduleProvider";
export function ScheduleButton({
  sessionId,
  compact = false,
}: {
  sessionId: string;
  compact?: boolean;
}) {
  const { ready, isScheduled, add, remove } = useSchedule();
  const added = ready && isScheduled(sessionId);
  return (
    <button
      type="button"
      className={`button ${compact ? "small" : ""} ${added ? "added" : ""}`}
      onClick={() => (added ? remove(sessionId) : add(sessionId))}
    >
      {added ? "✓ In my schedule" : "+ Add to schedule"}
    </button>
  );
}
