import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

function polygon(lon, lat) {
  return { type: 'Polygon', coordinates: [[[lon, lat], [lon + 1, lat], [lon + 1, lat + 1], [lon, lat]]] };
}

const fixture = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { NAME: 'United States', CONTINENT: 'North America', ADM0_A3: 'USA' }, geometry: polygon(-100, 40) },
    { type: 'Feature', properties: { NAME: 'S. Geo. and the Is.', CONTINENT: 'Seven seas (open ocean)', ADM0_A3: 'SGS' }, geometry: polygon(-36, -55) },
    { type: 'Feature', properties: { NAME: 'France', CONTINENT: 'Europe', ADM0_A3: 'FRA' }, geometry: polygon(2, 46) },
    { type: 'Feature', properties: { NAME: 'Egypt', CONTINENT: 'Africa', ADM0_A3: 'EGY' }, geometry: polygon(30, 27) },
    { type: 'Feature', properties: { NAME: 'Japan', CONTINENT: 'Asia', ADM0_A3: 'JPN' }, geometry: polygon(138, 36) },
    { type: 'Feature', properties: { NAME: 'Australia', CONTINENT: 'Oceania', ADM0_A3: 'AUS' }, geometry: polygon(134, -25) },
    { type: 'Feature', properties: { NAME: 'Antarctica', CONTINENT: 'Antarctica', ADM0_A3: 'ATA' }, geometry: polygon(0, -80) },
  ],
};

test('country normalization creates stable source-backed IDs and continent parents', async () => {
  const normalizer = await import('../src/explorer/build/entity-normalize.mjs').catch(() => null);
  assert.ok(normalizer, 'expected explorer entity normalization module');

  const entities = normalizer.normalizeCountryFeatures(fixture);
  const byId = new Map(entities.map((entity) => [entity.id, entity]));

  assert.equal(entities.filter((entity) => entity.kind === 'continent').length, 7);
  assert.equal(byId.get('ne:continent:australia')?.name, 'Australia');
  assert.deepEqual(byId.get('ne:country:FRA')?.parentIds, ['ne:continent:europe']);
  assert.deepEqual(byId.get('ne:country:AUS')?.parentIds, ['ne:continent:australia']);
  assert.deepEqual(byId.get('ne:country:SGS')?.parentIds, ['ne:continent:south-america']);
  assert.equal(byId.get('ne:country:SGS')?.properties.parentClassificationSource, 'UN M49');
  assert.equal(new Set(entities.map((entity) => entity.id)).size, entities.length);

  const withoutCode = structuredClone(fixture);
  withoutCode.features[0].properties.ADM0_A3 = '';
  assert.throws(() => normalizer.normalizeCountryFeatures(withoutCode), /stable ADM0_A3/i);

  const duplicateCode = structuredClone(fixture);
  duplicateCode.features[1].properties.ADM0_A3 = 'USA';
  assert.throws(() => normalizer.normalizeCountryFeatures(duplicateCode), /duplicate/i);

  const unknownOpenOcean = structuredClone(fixture);
  unknownOpenOcean.features[1].properties.ADM0_A3 = 'ZZZ';
  assert.throws(() => normalizer.normalizeCountryFeatures(unknownOpenOcean), /unsupported natural earth continent/i);
});

test('generated explorer foundation index and manifest are internally consistent', async () => {
  const [entitiesRaw, manifestRaw] = await Promise.all([
    readFile(new URL('../public/data/explorer/entities.json', import.meta.url), 'utf8').catch(() => ''),
    readFile(new URL('../public/data/explorer/manifest.json', import.meta.url), 'utf8').catch(() => ''),
  ]);

  assert.ok(entitiesRaw, 'expected generated explorer entity index');
  assert.ok(manifestRaw, 'expected generated explorer source manifest');

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

  const sgs = index.entities.find((entity) => entity.id === 'ne:country:SGS');
  assert.deepEqual(sgs?.parentIds, ['ne:continent:south-america']);
  assert.equal(sgs?.properties.parentClassificationSource, 'UN M49');

  assert.match(manifest.source.url, /ca96624a56bd078437bca8184e78163e5039ad19/);
  assert.equal(manifest.processingVersion, 1);
  assert.equal(manifest.output.path, 'data/explorer/entities.json');
  assert.equal(manifest.output.recordCount, index.entities.length);
  assert.equal(manifest.output.sha256, createHash('sha256').update(entitiesRaw).digest('hex'));
});
