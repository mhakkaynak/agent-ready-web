import type { Metadata } from "next";
import { SpeakerCard } from "@/components/SpeakerCard";
import { getAllSpeakers } from "@/lib/speakers";

export const metadata: Metadata = {
  title: "Speakers",
  description: "Meet the engineers and builders speaking at DevFest.",
};
export default function SpeakersPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <div>
            <p className="eyebrow">Meet the community</p>
            <h1 className="page-title">Speakers</h1>
            <p className="page-description">
              Engineers, advocates, and technical leaders sharing lessons from the work they do
              every day.
            </p>
          </div>
        </div>
        <div className="speaker-grid">
          {getAllSpeakers().map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </div>
  );
}
