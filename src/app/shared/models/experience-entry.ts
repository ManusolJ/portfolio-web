import type { TimelineEntry } from './timeline-entry';

export interface ExperienceEntry extends TimelineEntry {
  readonly location: string;
  readonly tags: readonly string[];
  readonly duties: readonly string[];
}
