import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const srcDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');

// Every barrel export must name a real file with exactly matching case, so the
// build works on case-sensitive filesystems such as Linux CI.
test('every path exported from src/index.ts exists with matching case', () => {
  const index = readFileSync(join(srcDir, 'index.ts'), 'utf8');
  const specifiers = [...index.matchAll(/from '\.\/([^']+)'/g)].map((m) => m[1]!);
  assert.ok(specifiers.length > 0);

  for (const spec of specifiers) {
    const file = `${spec}.ts`;
    const entries = readdirSync(join(srcDir, dirname(file)));
    assert.ok(entries.includes(basename(file)), `missing exact-case file src/${file}`);
  }
});

test('the video-format module the barrel points at exports getSupportedVideoFormat', async () => {
  const mod = await import('../src/OS/getSupportedVideoFormat');
  assert.equal(typeof mod.getSupportedVideoFormat, 'function');
});
