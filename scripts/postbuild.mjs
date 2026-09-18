import { createHash } from 'node:crypto';
import { cpSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT_FILES = 'root';
const OUTPUT = 'dist/portfolio-web/browser';
const SITE_URL = readFileSync('src/app/shared/constants/site.ts', 'utf8').match(
  /SITE_URL = '([^']+)'/,
)[1];

const pages = [];
const inlineScriptHashes = new Set();

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(path);
    } else if (entry.name === 'index.html') {
      pages.push(path);
      collectInlineScripts(readFileSync(path, 'utf8'));
    }
  }
}

function collectInlineScripts(html) {
  for (const match of html.matchAll(/<script(?<attrs>[^>]*)>(?<body>[\s\S]*?)<\/script>/g)) {
    const { attrs, body } = match.groups;
    if (attrs.includes('src=') || attrs.includes('application/json')) {
      continue;
    }

    inlineScriptHashes.add(createHash('sha256').update(body).digest('base64'));
  }
}

function routeOf(page) {
  return relative(OUTPUT, page)
    .replaceAll('\\', '/')
    .replace(/index\.html$/, '');
}

function sitemap() {
  const urls = pages
    .map(routeOf)
    .sort()
    .map((route) => `  <url><loc>${SITE_URL}/${route}</loc></url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function headers() {
  const scriptSources = ["'self'", ...[...inlineScriptHashes].map((hash) => `'sha256-${hash}'`)];
  const csp = [
    "default-src 'self'",
    `script-src ${scriptSources.join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  return `/*
  Content-Security-Policy: ${csp}
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*/media/*
  Cache-Control: public, max-age=31536000, immutable
`;
}

walk(OUTPUT);
cpSync(ROOT_FILES, OUTPUT, { recursive: true });
writeFileSync(join(OUTPUT, 'sitemap.xml'), sitemap());
writeFileSync(join(OUTPUT, '_headers'), headers());

console.log(
  `postbuild: ${pages.length} pages in sitemap, ${inlineScriptHashes.size} inline script hashes`,
);
