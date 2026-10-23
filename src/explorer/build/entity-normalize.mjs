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
    const displayContinent = CONTINENT_ALIASES.get(sourceContinent);

    if (!name || !feature?.geometry) {
      throw new TypeError('Explorer country feature requires a name and geometry.');
    }
    if (!code || code === '-99') {
      throw new TypeError(`Explorer country ${name} requires a stable ADM0_A3 identifier.`);
    }
    if (seenCodes.has(code)) {
      throw new TypeError(`Duplicate explorer ADM0_A3 identifier: ${code}.`);
    }
    if (!displayContinent) {
      throw new TypeError(`Unsupported Natural Earth continent for ${name}: ${sourceContinent || '(missing)'}.`);
    }

    seenCodes.add(code);
    featuresByContinent.get(displayContinent).push(feature);
    const metadata = geometryMetadata(feature);
    countries.push({
      id: `ne:country:${code}`,
      kind: 'country',
      name,
      aliases: [],
      parentIds: [continentId(displayContinent)],
      source: { dataset: 'natural-earth-50m-admin0', id: code },
      bbox: metadata.bbox,
      centroid: metadata.centroid,
      properties: {
        isoA3: code,
        sourceContinent,
      },
    });
  }

  const continents = EXPLORER_CONTINENTS.map((name) => {
    const childFeatures = featuresByContinent.get(name);
    if (!childFeatures.length) {
      throw new TypeError(`Natural Earth source produced no features for continent ${name}.`);
    }
    const collection = { type: 'FeatureCollection', features: childFeatures };
    const metadata = geometryMetadata(collection);
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
