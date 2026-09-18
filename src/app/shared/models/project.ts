import type { ProjectSection } from './project-section';

//TODO: Add gallery and video demo when both are available
export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly repo?: string;
  readonly demo?: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly sections: readonly ProjectSection[];
}
