import type { LucideIcon } from '@lucide/angular';

export type OptionIcon =
  | { readonly kind: 'lucide'; readonly component: LucideIcon }
  | { readonly kind: 'image'; readonly src: string };
