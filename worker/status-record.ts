export interface StatusRecord {
  readonly data?: unknown;
  readonly reachable: boolean;
  readonly fetchedAt?: string;
  readonly unreachableSince?: string;
}
