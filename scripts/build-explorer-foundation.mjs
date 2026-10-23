import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { NATURAL_EARTH_SOURCE } from '../src/lib/map-data.mjs';
import { normalizeCountryFeatures } from '../src/explorer/build/entity-normalize.mjs';

const SOURCE = new URL('../public/data/world-countries.geojson', import.meta.url);
const SOURCE_META = new URL('../public/data/world-countries.meta.json', import.meta.url);
const OUTPUT_DIR = new URL('../public/data/explorer/', import.meta.url);
const ENTITIES_OUTPUT = new URL('./entities.json', OUTPUT_DIR);
const MANIFEST_OUTPUT = new URL('./manifest.json', OUTPUT_DIR);

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

const [sourceRaw, sourceMetaRaw] = await Promise.all([
  readFile(SOURCE, 'utf8'),
  readFile(SOURCE_META, 'utf8'),
]);

const sourceMeta = JSON.parse(sourceMetaRaw);
if (sourceMeta.source !== NATURAL_EARTH_SOURCE) {
  throw new Error('Explorer foundation source metadata does not match the pinned Natural Earth source.');
}
const sourceDigest = sha256(sourceRaw);
if (sourceMeta.sha256 !== sourceDigest) {
  throw new Error('Explorer foundation source hash does not match world-countries metadata.');
}

const source = JSON.parse(sourceRaw);
const entities = normalizeCountryFeatures(source);
const indexRaw = `${JSON.stringify({ version: 1, entities })}\n`;
const manifest = {
  version: 1,
  processingVersion: 1,
  source: {
    url: NATURAL_EARTH_SOURCE,
    sha256: sourceDigest,
    featureCount: source.features.length,
  },
  output: {
    path: 'data/explorer/entities.json',
    sha256: sha256(indexRaw),
    recordCount: entities.length,
  },
};

await mkdir(OUTPUT_DIR, { recursive: true });
await Promise.all([
  writeFile(ENTITIES_OUTPUT, indexRaw),
  writeFile(MANIFEST_OUTPUT, `${JSON.stringify(manifest, null, 2)}\n`),
]);
