export type SessionLevel = "beginner" | "intermediate" | "advanced";

export type Session = {
  id: string;
  title: string;
  description: string;
  speakerId: string;
  startTime: string;
  endTime: string;
  room: string;
  level: SessionLevel;
  topics: string[];
};

export type Speaker = {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
};

export type TimeSlot = { startTime: string; endTime: string };
