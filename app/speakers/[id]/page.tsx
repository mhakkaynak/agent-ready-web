import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SessionList } from "@/components/SessionList";
import { initials } from "@/components/SpeakerCard";
import { getAllSpeakers, getSpeakerInfo } from "@/lib/speakers";
import { getSessionsBySpeaker } from "@/lib/sessions";

export function generateStaticParams() {
  return getAllSpeakers().map((speaker) => ({ id: speaker.id }));
}
export async function generateMetadata({ params }: PageProps<"/speakers/[id]">): Promise<Metadata> {
  const { id } = await params;
  const speaker = getSpeakerInfo(id);
  return speaker
    ? { title: speaker.name, description: speaker.bio }
    : { title: "Speaker not found" };
}
export default async function SpeakerDetailPage({ params }: PageProps<"/speakers/[id]">) {
  const { id } = await params;
  const speaker = getSpeakerInfo(id);
  if (!speaker) notFound();
  return (
    <div className="page">
      <div className="container">
        <Link className="back-link" href="/speakers">
          ← All speakers
        </Link>
        <section className="speaker-profile">
          <div className="speaker-avatar" aria-hidden="true">
            {initials(speaker.name)}
          </div>
          <div>
            <p className="eyebrow">{speaker.company}</p>
            <h1 className="page-title">{speaker.name}</h1>
            <p className="page-description">{speaker.title}</p>
            <p className="detail-description">{speaker.bio}</p>
          </div>
        </section>
        <div className="section-heading">
          <h2 className="section-title">Sessions by {speaker.name}</h2>
        </div>
        <SessionList sessions={getSessionsBySpeaker(speaker.id)} />
      </div>
    </div>
  );
}
