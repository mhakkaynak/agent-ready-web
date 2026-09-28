export function TopicBadge({ topic }: { topic: string }) {
  return <span className={`badge topic-${topic.toLowerCase()}`}>{topic}</span>;
}
