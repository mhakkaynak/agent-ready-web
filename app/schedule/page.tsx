import type { Metadata } from "next";
import { ScheduleView } from "@/components/ScheduleView";

export const metadata: Metadata = {
  title: "My Schedule",
  description: "Review your DevFest plan, conflicts, and open time.",
};
export default function SchedulePage() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <div>
            <p className="eyebrow">Your conference day</p>
            <h1 className="page-title">My schedule</h1>
            <p className="page-description">
              Your picks are sorted by time. Overlaps are called out so you can make the final
              choice.
            </p>
          </div>
        </div>
        <ScheduleView />
      </div>
    </div>
  );
}
