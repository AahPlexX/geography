import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const fixture = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { NAME: 'France', CONTINENT: 'Europe', ADM0_A3: 'FRA' },
      geometry: { type: 'Polygon', coordinates: [[[0, 0], [2, 0], [2, 2], [0, 0]]] },
    },
    {
      type: 'Feature',
      properties: { NAME: 'Australia', CONTINENT: 'Oceania', ADM0_A3: 'AUS' },
      geometry: { type: 'Polygon', coordinates: [[[130, -30], [140, -30], [140, -20], [130, -30]]] },
    },
  ],
};

test('country normalization creates stable source-backed IDs and continent parents', async () => {
  const normalizer = await import('../src/explorer/build/entity-normalize.mjs').catch(() => null);
  assert.ok(normalizer, 'expected explorer entity normalization module');

  const entities = normalizer.normalizeCountryFeatures(fixture);
  const byId = new Map(entities.map((entity) => [entity.id, entity]));

  assert.equal(byId.get('ne:continent:europe')?.kind, 'continent');
  assert.equal(byId.get('ne:continent:australia')?.name, 'Australia');
  assert.deepEqual(byId.get('ne:country:FRA')?.parentIds, ['ne:continent:europe']);
  assert.deepEqual(byId.get('ne:country:AUS')?.parentIds, ['ne:continent:australia']);
  assert.equal(byId.get('ne:country:FRA')?.source.id, 'FRA');
  assert.equal(new Set(entities.map((entity) => entity.id)).size, entities.length);

  const withoutCode = structuredClone(fixture);
  withoutCode.features[0].properties.ADM0_A3 = '';
  assert.throws(() => normalizer.normalizeCountryFeatures(withoutCode), /stable ADM0_A3/i);

  const duplicateCode = structuredClone(fixture);
  duplicateCode.features[1].properties.ADM0_A3 = 'FRA';
  assert.throws(() => normalizer.normalizeCountryFeatures(duplicateCode), /duplicate/i);
});

test('committed explorer foundation index and manifest are internally consistent', async () => {
  const [entitiesRaw, manifestRaw] = await Promise.all([
    readFile(new URL('../public/data/explorer/entities.json', import.meta.url), 'utf8').catch(() => ''),
    readFile(new URL('../public/data/explorer/manifest.json', import.meta.url), 'utf8').catch(() => ''),
  ]);

  assert.ok(entitiesRaw, 'expected committed explorer entity index');
  assert.ok(manifestRaw, 'expected committed explorer source manifest');

  const index = JSON.parse(entitiesRaw);
  const manifest = JSON.parse(manifestRaw);
  assert.equal(index.version, 1);
  assert.ok(Array.isArray(index.entities) && index.entities.length > 150);
  assert.equal(index.entities.filter((entity) => entity.kind === 'continent').length, 7);
  assert.doesNotMatch(entitiesRaw, /"geometry"\s*:/, 'search index must not embed detailed geometry');

  const ids = new Set(index.entities.map((entity) => entity.id));
  assert.equal(ids.size, index.entities.length);
  for (const country of index.entities.filter((entity) => entity.kind === 'country')) {
    assert.equal(country.parentIds.length, 1);
    assert.ok(ids.has(country.parentIds[0]), `missing parent ${country.parentIds[0]} for ${country.id}`);
  }

  assert.match(manifest.source.url, /ca96624a56bd078437bca8184e78163e5039ad19/);
  assert.equal(manifest.processingVersion, 1);
  assert.equal(manifest.output.path, 'data/explorer/entities.json');
  assert.equal(manifest.output.recordCount, index.entities.length);
  assert.equal(manifest.output.sha256, createHash('sha256').update(entitiesRaw).digest('hex'));
});
