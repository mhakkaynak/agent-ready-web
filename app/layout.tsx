import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ScheduleProvider } from "@/components/ScheduleProvider";
import { WebMcpTools } from "@/components/WebMcpTools";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DevFest Session Planner",
    template: "%s | DevFest Session Planner",
  },
  description:
    "Browse DevFest sessions, meet the speakers, and build a conflict-aware conference schedule.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ScheduleProvider>
          <WebMcpTools />
          <Header />
          <main>{children}</main>
          <footer className="site-footer">
            <div className="container footer-inner">
              <span>DevFest Session Planner</span>
              <span>One day. Great ideas. Your schedule.</span>
            </div>
          </footer>
        </ScheduleProvider>
      </body>
    </html>
  );
}
