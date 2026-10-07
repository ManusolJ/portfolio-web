import type { StatusRecord } from './status-record';

const STATUS_KEY = 'status';
const POLL_TIMEOUT_MS = 5000;
const STATUS_PATH = '/api/status';
const EMPTY_RECORD = JSON.stringify({ reachable: false });
const RESPONSE_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'public, max-age=60',
  'x-content-type-options': 'nosniff',
};

export default {
  async scheduled(_controller, env) {
    const stored = await env.STATUS.get(STATUS_KEY);
    const previous = parseRecord(stored);
    let record: StatusRecord;

    try {
      record = markReachable(await poll(env.API_URL));
    } catch {
      record = markUnreachable(previous);
    }

    const next = JSON.stringify(record);

    if (next !== stored) {
      await env.STATUS.put(STATUS_KEY, next);
    }
  },

  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname !== STATUS_PATH) {
      return env.ASSETS.fetch(request);
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response(null, { status: 405, headers: { allow: 'GET, HEAD' } });
    }

    const record = await env.STATUS.get(STATUS_KEY);

    return new Response(record ?? EMPTY_RECORD, { headers: RESPONSE_HEADERS });
  },
} satisfies ExportedHandler<Env>;

function parseRecord(stored: string | null): StatusRecord | null {
  if (stored === null) {
    return null;
  }

  try {
    return JSON.parse(stored) as StatusRecord;
  } catch {
    return null;
  }
}

async function poll(apiUrl: string): Promise<unknown> {
  const response = await fetch(`${apiUrl}/api/v1/status`, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(POLL_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

function markReachable(data: unknown): StatusRecord {
  return { reachable: true, fetchedAt: new Date().toISOString(), data };
}

function markUnreachable(previous: StatusRecord | null): StatusRecord {
  const unreachableSince =
    previous?.reachable === false ? previous.unreachableSince : new Date().toISOString();

  return { ...previous, reachable: false, unreachableSince };
}
