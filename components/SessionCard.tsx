import Link from "next/link";
import { getSpeakerInfo } from "@/lib/speakers";
import type { Session } from "@/lib/types";
import { LevelBadge } from "./LevelBadge";
import { ScheduleButton } from "./ScheduleButton";
import { TopicBadge } from "./TopicBadge";

const accents: Record<string, string> = {
  AI: "#4285f4",
  Web: "#34a853",
  Backend: "#8e44ad",
  Cloud: "#8e44ad",
  Mobile: "#fbbc04",
  DevOps: "#00897b",
  Security: "#ea4335",
};
export function SessionCard({ session }: { session: Session }) {
  const speaker = getSpeakerInfo(session.speakerId);
  return (
    <article
      className="session-card"
      style={{ "--accent": accents[session.topics[0]] ?? "#4285f4" } as React.CSSProperties}
    >
      <div className="session-meta">
        <span>
          {session.startTime}–{session.endTime}
        </span>
        <LevelBadge level={session.level} />
      </div>
      <h3>
        <Link href={`/sessions/${session.id}`}>{session.title}</Link>
      </h3>
      {speaker && (
        <p className="speaker-line">
          <Link href={`/speakers/${speaker.id}`}>{speaker.name}</Link> · {speaker.company}
        </p>
      )}
      <div className="badge-row">
        {session.topics.map((topic) => (
          <TopicBadge key={topic} topic={topic} />
        ))}
      </div>
      <div className="card-footer">
        <span className="room">{session.room}</span>
        <ScheduleButton sessionId={session.id} compact />
      </div>
    </article>
  );
}
