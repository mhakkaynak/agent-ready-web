"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { addToSchedule, clearSchedule, getMySchedule, removeFromSchedule } from "@/lib/schedule";
import type { Session } from "@/lib/types";

type ScheduleContextValue = {
  schedule: Session[];
  ready: boolean;
  isScheduled: (sessionId: string) => boolean;
  add: (sessionId: string) => void;
  remove: (sessionId: string) => void;
  clear: () => void;
};
const ScheduleContext = createContext<ScheduleContextValue | null>(null);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [schedule, setSchedule] = useState<Session[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSchedule(getMySchedule());
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const add = useCallback((sessionId: string) => setSchedule(addToSchedule(sessionId)), []);
  const remove = useCallback((sessionId: string) => setSchedule(removeFromSchedule(sessionId)), []);
  const clear = useCallback(() => setSchedule(clearSchedule()), []);
  const ids = useMemo(() => new Set(schedule.map((session) => session.id)), [schedule]);
  return (
    <ScheduleContext.Provider
      value={{ schedule, ready, isScheduled: (id) => ids.has(id), add, remove, clear }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule(): ScheduleContextValue {
  const value = useContext(ScheduleContext);
  if (!value) throw new Error("useSchedule must be used inside ScheduleProvider");
  return value;
}
