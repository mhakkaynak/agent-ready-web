import type { Metadata } from "next";
import { SessionFilters } from "@/components/SessionFilters";

export const metadata: Metadata = {
  title: "Sessions",
  description: "Search and filter the full DevFest program.",
};
export default async function SessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic = "" } = await searchParams;
  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <div>
            <p className="eyebrow">Conference program</p>
            <h1 className="page-title">Sessions</h1>
            <p className="page-description">
              Search the program, compare levels and topics, and add the sessions you don’t want to
              miss.
            </p>
          </div>
        </div>
        <SessionFilters initialTopic={topic} />
      </div>
    </div>
  );
}
