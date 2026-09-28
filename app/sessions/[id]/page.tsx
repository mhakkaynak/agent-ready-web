import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LevelBadge } from "@/components/LevelBadge";
import { ScheduleButton } from "@/components/ScheduleButton";
import { TopicBadge } from "@/components/TopicBadge";
import { getAllSessions, getSessionById } from "@/lib/sessions";
import { getSpeakerInfo } from "@/lib/speakers";

export function generateStaticParams() {
  return getAllSessions().map((session) => ({ id: session.id }));
}
export async function generateMetadata({ params }: PageProps<"/sessions/[id]">): Promise<Metadata> {
  const { id } = await params;
  const session = getSessionById(id);
  return session
    ? { title: session.title, description: session.description }
    : { title: "Session not found" };
}
export default async function SessionDetailPage({ params }: PageProps<"/sessions/[id]">) {
  const { id } = await params;
  const session = getSessionById(id);
  if (!session) notFound();
  const speaker = getSpeakerInfo(session.speakerId);
  return (
    <div className="page">
      <div className="container">
        <Link className="back-link" href="/sessions">
          ← All sessions
        </Link>
        <div className="detail-shell">
          <article>
            <LevelBadge level={session.level} />
            <h1 className="detail-title">{session.title}</h1>
            <div className="detail-topics">
              {session.topics.map((topic) => (
                <TopicBadge key={topic} topic={topic} />
              ))}
            </div>
            <p className="detail-description">{session.description}</p>
            {speaker && (
              <p className="speaker-line">
                Presented by{" "}
                <Link className="text-link" href={`/speakers/${speaker.id}`}>
                  {speaker.name}
                </Link>
                , {speaker.title} at {speaker.company}.
              </p>
            )}
          </article>
          <aside className="info-panel">
            <dl className="info-list">
              <div>
                <dt>Time</dt>
                <dd>
                  {session.startTime}–{session.endTime}
                </dd>
              </div>
              <div>
                <dt>Room</dt>
                <dd>{session.room}</dd>
              </div>
              <div>
                <dt>Speaker</dt>
                <dd>{speaker?.name}</dd>
              </div>
            </dl>
            <ScheduleButton sessionId={session.id} />
          </aside>
        </div>
      </div>
    </div>
  );
}
