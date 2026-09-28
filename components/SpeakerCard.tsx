import Link from "next/link";
import type { Speaker } from "@/lib/types";
export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}
export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <article className="speaker-card">
      <div className="speaker-avatar" aria-hidden="true">
        {initials(speaker.name)}
      </div>
      <div>
        <h2>
          <Link href={`/speakers/${speaker.id}`}>{speaker.name}</Link>
        </h2>
        <p className="speaker-role">
          {speaker.title} · {speaker.company}
        </p>
      </div>
      <p className="speaker-bio">{speaker.bio}</p>
    </article>
  );
}
