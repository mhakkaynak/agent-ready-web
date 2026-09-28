import Link from "next/link";
import { SessionList } from "@/components/SessionList";
import { getAllSessions } from "@/lib/sessions";

const topics = ["AI", "Web", "Backend", "Cloud", "Mobile", "DevOps", "Security"];
export default function Home() {
  const featured = getAllSessions().filter((session) =>
    ["web-performance", "ai-evaluation", "passkeys"].includes(session.id),
  );
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">DevFest · 18 October</p>
            <h1>
              Build your <span>best day</span> at DevFest.
            </h1>
            <p>
              Explore practical sessions from engineers and builders, then shape a personal schedule
              that keeps every great idea within reach.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/sessions">
                Explore all sessions →
              </Link>
              <Link className="button secondary" href="/schedule">
                View my schedule
              </Link>
            </div>
          </div>
          <div className="hero-board" aria-hidden="true">
            <span className="color-orbit orbit-blue" />
            <span className="color-orbit orbit-red" />
            <span className="color-orbit orbit-yellow" />
            <span className="color-orbit orbit-green" />
            <div className="date-card">
              <div>
                <span>Saturday</span>
                <br />
                <strong>18 OCT</strong>
              </div>
              <div className="date-row">
                <span>09:00–18:00</span>
                <b>4 stages</b>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Start exploring</p>
              <h2 className="section-title">Find your track</h2>
            </div>
          </div>
          <div className="topic-strip">
            {topics.map((topic) => (
              <Link
                key={topic}
                className="topic-link"
                href={`/sessions?topic=${encodeURIComponent(topic)}`}
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="home-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Worth a look</p>
              <h2 className="section-title">Featured sessions</h2>
            </div>
            <Link className="text-link" href="/sessions">
              See the full program →
            </Link>
          </div>
          <SessionList sessions={featured} />
        </div>
      </section>
    </>
  );
}
