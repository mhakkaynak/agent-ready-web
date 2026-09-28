"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSchedule } from "./ScheduleProvider";

export function Header() {
  const pathname = usePathname();
  const { schedule, ready } = useSchedule();
  const links = [
    { href: "/sessions", label: "Sessions" },
    { href: "/speakers", label: "Speakers" },
  ];
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="DevFest Session Planner home">
          <Image
            className="brand-logo"
            src="/favicon.svg"
            alt=""
            width={316}
            height={191}
            priority
          />
          <span className="brand-text">DevFest Planner</span>
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/schedule"
            className="schedule-link"
            aria-current={pathname === "/schedule" ? "page" : undefined}
          >
            My schedule{ready && <span className="nav-count">{schedule.length}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
