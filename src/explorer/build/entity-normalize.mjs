import { geoBounds, geoCentroid } from 'd3-geo';

export const EXPLORER_CONTINENTS = [
  'North America',
  'South America',
  'Europe',
  'Africa',
  'Asia',
  'Australia',
  'Antarctica',
];

const CONTINENT_ALIASES = new Map([
  ['North America', 'North America'],
  ['South America', 'South America'],
  ['Europe', 'Europe'],
  ['Africa', 'Africa'],
  ['Asia', 'Asia'],
  ['Oceania', 'Australia'],
  ['Australia', 'Australia'],
  ['Antarctica', 'Antarctica'],
]);

const CONTINENT_OVERRIDES = new Map([
  ['SGS', { sourceContinent: 'Seven seas (open ocean)', continent: 'South America', classificationSource: 'UN M49' }],
]);

function continentId(name) {
  return `ne:continent:${name.toLowerCase().replaceAll(' ', '-')}`;
}

function finitePair(value) {
  return Array.isArray(value) && value.length === 2 && value.every(Number.isFinite) ? value : null;
}

function geometryMetadata(feature) {
  const bounds = geoBounds(feature);
  const centroid = geoCentroid(feature);
  return {
    bbox: Array.isArray(bounds) && bounds.length === 2 && finitePair(bounds[0]) && finitePair(bounds[1])
      ? [bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1]]
      : null,
    centroid: finitePair(centroid) ? [centroid[0], centroid[1]] : null,
  };
}

function assertFeatureCollection(value) {
  if (!value || value.type !== 'FeatureCollection' || !Array.isArray(value.features)) {
    throw new TypeError('Explorer country source must be a GeoJSON FeatureCollection.');
  }
}

function resolveContinent(code, sourceContinent) {
  const direct = CONTINENT_ALIASES.get(sourceContinent);
  if (direct) return { continent: direct, classificationSource: null };

  const override = CONTINENT_OVERRIDES.get(code);
  if (override?.sourceContinent === sourceContinent) {
    return { continent: override.continent, classificationSource: override.classificationSource };
  }
  return null;
}

export function normalizeCountryFeatures(source) {
  assertFeatureCollection(source);

  const seenCodes = new Set();
  const featuresByContinent = new Map(EXPLORER_CONTINENTS.map((name) => [name, []]));
  const countries = [];

  for (const feature of source.features) {
    const properties = feature?.properties;
    const name = typeof properties?.NAME === 'string' ? properties.NAME.trim() : '';
    const rawCode = typeof properties?.ADM0_A3 === 'string' ? properties.ADM0_A3.trim() : '';
    const code = rawCode.toUpperCase();
    const sourceContinent = typeof properties?.CONTINENT === 'string' ? properties.CONTINENT.trim() : '';
    const resolvedContinent = resolveContinent(code, sourceContinent);

    if (!name || !feature?.geometry) {
      throw new TypeError('Explorer country feature requires a name and geometry.');
    }
    if (!code || code === '-99') {
      throw new TypeError(`Explorer country ${name} requires a stable ADM0_A3 identifier.`);
    }
    if (seenCodes.has(code)) {
      throw new TypeError(`Duplicate explorer ADM0_A3 identifier: ${code}.`);
    }
    if (!resolvedContinent) {
      throw new TypeError(`Unsupported Natural Earth continent for ${name}: ${sourceContinent || '(missing)'}.`);
    }

    seenCodes.add(code);
    featuresByContinent.get(resolvedContinent.continent).push(feature);
    const metadata = geometryMetadata(feature);
    const normalizedProperties = {
      isoA3: code,
      sourceContinent,
    };
    if (resolvedContinent.classificationSource) {
      normalizedProperties.parentClassificationSource = resolvedContinent.classificationSource;
    }

    countries.push({
      id: `ne:country:${code}`,
      kind: 'country',
      name,
      aliases: [],
      parentIds: [continentId(resolvedContinent.continent)],
      source: { dataset: 'natural-earth-50m-admin0', id: code },
      bbox: metadata.bbox,
      centroid: metadata.centroid,
      properties: normalizedProperties,
    });
  }

  const continents = EXPLORER_CONTINENTS.map((name) => {
    const childFeatures = featuresByContinent.get(name);
    if (!childFeatures.length) {
      throw new TypeError(`Natural Earth source produced no features for continent ${name}.`);
    }
    const metadata = geometryMetadata({ type: 'FeatureCollection', features: childFeatures });
    return {
      id: continentId(name),
      kind: 'continent',
      name,
      aliases: name === 'Australia' ? ['Oceania'] : [],
      parentIds: [],
      source: { dataset: 'natural-earth-50m-admin0', id: name === 'Australia' ? 'Oceania' : name },
      bbox: metadata.bbox,
      centroid: metadata.centroid,
      properties: {},
    };
  });

  countries.sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
  return [...continents, ...countries];
}
