import type { SessionLevel } from "@/lib/types";
export function LevelBadge({ level }: { level: SessionLevel }) {
  return <span className="badge level-badge">{level}</span>;
}
