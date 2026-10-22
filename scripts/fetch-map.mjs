import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { NATURAL_EARTH_SOURCE, compactNaturalEarth, validateNaturalEarth } from '../src/lib/map-data.mjs';

const OUTPUT = new URL('../public/data/world-countries.geojson', import.meta.url);
const META = new URL('../public/data/world-countries.meta.json', import.meta.url);

async function validCachedFile() {
  try {
    const [raw, metaRaw] = await Promise.all([readFile(OUTPUT, 'utf8'), readFile(META, 'utf8')]);
    const meta = JSON.parse(metaRaw);
    return meta.source === NATURAL_EARTH_SOURCE && meta.sha256 === createHash('sha256').update(raw).digest('hex');
  } catch {
    return false;
  }
}

if (!(await validCachedFile())) {
  const response = await fetch(NATURAL_EARTH_SOURCE);
  if (!response.ok) throw new Error(`Map download failed: ${response.status} ${response.statusText}`);
  const parsed = await response.json();
  if (!validateNaturalEarth(parsed)) throw new Error('Map download failed validation: expected Natural Earth country features with continent metadata.');
  const raw = JSON.stringify(compactNaturalEarth(parsed));
  await mkdir(new URL('../public/data/', import.meta.url), { recursive: true });
  await writeFile(OUTPUT, raw);
  await writeFile(META, JSON.stringify({ source: NATURAL_EARTH_SOURCE, sha256: createHash('sha256').update(raw).digest('hex') }, null, 2) + '\n');
}
