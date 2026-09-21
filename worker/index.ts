import { StatusRecord } from './status-record';

const STATUS_KEY = 'status';
const PROBE_TIMEOUT_MS = 5000;
const STATUS_PATH = '/api/status';
const RESPONSE_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'public, max-age=60',
  'x-content-type-options': 'nosniff',
};

export default {
  async scheduled(_controller, env) {
    await probe(env);
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

    return new Response(record ?? JSON.stringify({ reachable: false }), {
      headers: RESPONSE_HEADERS,
    });
  },
} satisfies ExportedHandler<Env>;

async function probe(env: Env): Promise<void> {
  const previous = await env.STATUS.get<StatusRecord>(STATUS_KEY, 'json');
  const now = new Date().toISOString();

  try {
    const response = await fetch(`${env.API_URL}/api/v1/status`, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const record: StatusRecord = { reachable: true, fetchedAt: now, data: await response.json() };

    await env.STATUS.put(STATUS_KEY, JSON.stringify(record));
  } catch {
    const record: StatusRecord = {
      ...previous,
      reachable: false,
      unreachableSince: previous?.reachable === false ? previous.unreachableSince : now,
    };

    await env.STATUS.put(STATUS_KEY, JSON.stringify(record));
  }
}
