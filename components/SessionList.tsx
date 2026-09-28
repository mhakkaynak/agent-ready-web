import type { Session } from "@/lib/types";
import { SessionCard } from "./SessionCard";
export function SessionList({ sessions }: { sessions: Session[] }) {
  if (sessions.length === 0)
    return (
      <div className="empty-state">
        <h2>No sessions found</h2>
        <p>Try broadening your search or changing a filter.</p>
      </div>
    );
  return (
    <div className="session-grid">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}
