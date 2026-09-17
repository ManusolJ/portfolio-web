export interface TimelineEntry {
  readonly url: string;
  readonly end?: string;
  readonly logo: string;
  readonly start: string;
  readonly title: string;
  readonly location?: string;
  readonly organization: string;
}
