import { speakers } from "./data";
import type { Speaker } from "./types";

export function getAllSpeakers(): Speaker[] {
  return [...speakers];
}
export function getSpeakerInfo(speakerId: string): Speaker | undefined {
  return speakers.find((speaker) => speaker.id === speakerId);
}
