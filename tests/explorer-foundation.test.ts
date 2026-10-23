import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { resolveAppRoute } from '../src/lib/app-route.ts';

test('explorer is an additive direct application route', async () => {
  assert.equal(resolveAppRoute('/geography/', '/geography/'), 'home');
  assert.equal(resolveAppRoute('/geography/exam/', '/geography/'), 'exam');
  assert.equal(resolveAppRoute('/geography/map/', '/geography/'), 'map');
  assert.equal(resolveAppRoute('/geography/explore/', '/geography/'), 'explore');

  const [exploreHtml, viteSource, mainSource, landingSource, workflowSource] = await Promise.all([
    readFile(new URL('../explore/index.html', import.meta.url), 'utf8').catch(() => ''),
    readFile(new URL('../vite.config.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/main.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/LandingPage.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8'),
  ]);

  assert.match(exploreHtml, /<title>Interactive World Explorer<\/title>/);
  assert.match(viteSource, /explore:\s*fileURLToPath\(new URL\('\.\/explore\/index\.html'/);
  assert.match(mainSource, /ExplorerPage/);
  assert.match(landingSource, /href=\{`\$\{base\}explore\/`\}/);
  assert.match(landingSource, /Explore the world/);
  assert.match(workflowSource, /fetch_page "explore\/" "Interactive World Explorer"/);
});
