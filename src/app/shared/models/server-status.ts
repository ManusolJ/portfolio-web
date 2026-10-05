export interface ServerStatusRecord {
  readonly reachable: boolean;
  readonly fetchedAt?: string;
  readonly data?: ServerStatus;
  readonly unreachableSince?: string;
}

export interface ServerStatus {
  readonly generatedAt: string;
  readonly host: ServerHost | null;
  readonly services: readonly ServerService[];
}

export interface ServerHost {
  readonly load1m: number;
  readonly sampledAt: string;
  readonly cpuPercent: number;
  readonly memUsedBytes: number;
  readonly memTotalBytes: number;
  readonly uptimeSeconds: number;
  readonly diskUsedBytes: number;
  readonly diskTotalBytes: number;
  readonly tempCelsius: number | null;
}

export interface ServerService {
  readonly up: boolean;
  readonly name: string;
  readonly uptime: ServerUptime;
  readonly latencyMs: number | null;
  readonly checkedAt: string | null;
  readonly statusCode: number | null;
  readonly days: readonly ServerDay[];
  readonly lastIncident: ServerIncident | null;
}

export interface ServerUptime {
  readonly last7Days: number;
  readonly last30Days: number;
  readonly last90Days: number;
}

export interface ServerDay {
  readonly day: string;
  readonly uptime: number;
  readonly hasGap: boolean;
  readonly avgLatencyMs: number | null;
}

export interface ServerIncident {
  readonly ongoing: boolean;
  readonly startedAt: string;
  readonly endedAt: string | null;
  readonly statusCode: number | null;
}
