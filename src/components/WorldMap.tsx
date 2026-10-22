import { memo, useEffect, useMemo, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { geoGraticule10, geoNaturalEarth1, geoPath } from 'd3-geo';
import { groupFeaturesByContinent } from '../lib/mapGeometry';

type CountryFeature = {
  type: 'Feature';
  properties: { CONTINENT: string; NAME: string; ADM0_A3?: string };
  geometry: unknown;
};

type WorldData = {
  type: 'FeatureCollection';
  features: CountryFeature[];
};

type Props = {
  onHotspot: (name: string) => void;
  selected?: { name: string; correct: boolean } | null;
};

type CountryPath = { key: string; d: string };

type MapModel = {
  sphere: string;
  graticule: string;
  equator: string;
  primeMeridian: string;
  continents: Array<{ name: string; paths: CountryPath[] }>;
  labels: Array<{ name: string; x: number; y: number }>;
  oceans: Array<{ key: string; name: string; x: number; y: number }>;
};

const continentColors: Record<string, string> = {
  'North America': '#78C68B',
  'South America': '#47B86C',
  Europe: '#F4D35E',
  Africa: '#F4A261',
  Asia: '#EE8E8E',
  Australia: '#B79CED',
  Antarctica: '#E8EEF4',
};

const labelPoints: Record<string, [number, number]> = {
  'North America': [-105, 48],
  'South America': [-60, -18],
  Europe: [16, 53],
  Africa: [20, 5],
  Asia: [90, 43],
  Australia: [135, -25],
  Antarctica: [10, -76],
};

const oceanPoints: Array<[string, number, number]> = [
  ['Pacific Ocean', -150, 5],
  ['Pacific Ocean', 160, 2],
  ['Atlantic Ocean', -34, 16],
  ['Indian Ocean', 78, -24],
  ['Arctic Ocean', 10, 75],
  ['Southern Ocean', 75, -62],
];

const equatorLine = { type: 'LineString', coordinates: Array.from({ length: 73 }, (_, i) => [-180 + i * 5, 0]) };
const primeMeridianLine = { type: 'LineString', coordinates: Array.from({ length: 35 }, (_, i) => [0, -85 + i * 5]) };

function activate(event: KeyboardEvent<SVGGElement>, action: () => void) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    action();
  }
}

/* ------------------------------------------------------------------ */
/* Data loading: one shared request, cached for the life of the page.  */
/* ------------------------------------------------------------------ */

let worldCache: WorldData | null = null;
let worldRequest: Promise<WorldData> | null = null;

function loadWorld(): Promise<WorldData> {
  if (worldCache) return Promise.resolve(worldCache);
  if (!worldRequest) {
    worldRequest = fetch(`${import.meta.env.BASE_URL}data/world-countries.geojson`)
      .then((response) => {
        if (!response.ok) throw new Error(`Map request failed with ${response.status}`);
        return response.json() as Promise<WorldData>;
      })
      .then((data) => {
        if (!data || !Array.isArray(data.features)) throw new Error('Map data is malformed');
        worldCache = data;
        return data;
      })
      .catch((error: unknown) => {
        worldRequest = null; // allow a later mount to retry
        throw error;
      });
  }
  return worldRequest;
}

/* ------------------------------------------------------------------ */
/* Geometry: projected once per dataset, not once per render.          */
/* ------------------------------------------------------------------ */

const modelCache = new WeakMap<WorldData, MapModel>();

function buildModel(world: WorldData): MapModel {
  const cached = modelCache.get(world);
  if (cached) return cached;

  const projection = geoNaturalEarth1().fitExtent([[18, 18], [782, 402]], world as never);
  const path = geoPath(projection);
  const toPath = (geometry: unknown) => path(geometry as never) ?? '';
  const groups = groupFeaturesByContinent(world.features);

  const model: MapModel = {
    sphere: toPath({ type: 'Sphere' }),
    graticule: toPath(geoGraticule10()),
    equator: toPath(equatorLine),
    primeMeridian: toPath(primeMeridianLine),
    continents: Object.entries(groups).map(([name, features]) => ({
      name,
      paths: features
        .map((feature, index) => ({
          key: `${feature.properties.ADM0_A3 ?? feature.properties.NAME}-${index}`,
          d: toPath(feature),
        }))
        .filter((entry) => entry.d !== ''),
    })),
    labels: Object.entries(labelPoints).flatMap(([name, coordinates]) => {
      const point = projection(coordinates);
      return point ? [{ name, x: point[0], y: point[1] }] : [];
    }),
    oceans: oceanPoints.flatMap(([name, lon, lat], index) => {
      const point = projection([lon, lat]);
      return point ? [{ key: `${name}-${index}`, name, x: point[0], y: point[1] }] : [];
    }),
  };

  modelCache.set(world, model);
  return model;
}

/* Country shapes never change after load, so skip reconciling them when
   only `selected` changes. */
const CountryPaths = memo(function CountryPaths({ paths }: { paths: readonly CountryPath[] }) {
  return (
    <>
      {paths.map((entry) => (
        <path key={entry.key} d={entry.d} />
      ))}
    </>
  );
});

export function WorldMap({ onHotspot, selected }: Props) {
  const [world, setWorld] = useState<WorldData | null>(() => worldCache);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (world) return;
    let active = true;
    loadWorld()
      .then((data) => {
        if (active) setWorld(data);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });
    return () => {
      active = false;
    };
  }, [world]);

  const map = useMemo(() => (world ? buildModel(world) : null), [world]);

  if (loadError) {
    return <div className="map-status" role="alert">The detailed map asset did not load. Refresh the page; the answer buttons remain available.</div>;
  }

  if (!map) {
    return <div className="map-status" role="status" aria-live="polite">Loading detailed world geography…</div>;
  }

  const stateClass = (name: string) => selected?.name === name ? (selected.correct ? ' is-correct' : ' is-wrong') : '';

  return (
    <div className="world-map-wrap">
      <svg className="world-map" viewBox="0 0 800 420" role="group" aria-labelledby="world-map-title world-map-desc">
        <title id="world-map-title">Interactive world map</title>
        <desc id="world-map-desc">Natural Earth country boundaries grouped into seven keyboard-operable continents, with the Equator, Prime Meridian, and five oceans labeled.</desc>
        <path d={map.sphere} className="map-ocean" />
        <path d={map.graticule} className="map-graticule" />

        {map.continents.map(({ name, paths }) => (
          <g
            key={name}
            role="button"
            tabIndex={0}
            aria-label={`${name} continent`}
            className={`map-continent${stateClass(name)}`}
            onClick={() => onHotspot(name)}
            onKeyDown={(event) => activate(event, () => onHotspot(name))}
            style={{ '--continent-fill': continentColors[name] } as CSSProperties}
          >
            <CountryPaths paths={paths} />
          </g>
        ))}

        <g role="button" tabIndex={0} aria-label="Equator" className={`map-reference equator${stateClass('Equator')}`} onClick={() => onHotspot('Equator')} onKeyDown={(event) => activate(event, () => onHotspot('Equator'))}>
          <path d={map.equator} className="map-reference-hit" />
          <path d={map.equator} className="map-reference-line" />
        </g>
        <g role="button" tabIndex={0} aria-label="Prime Meridian" className={`map-reference meridian${stateClass('Prime Meridian')}`} onClick={() => onHotspot('Prime Meridian')} onKeyDown={(event) => activate(event, () => onHotspot('Prime Meridian'))}>
          <path d={map.primeMeridian} className="map-reference-hit" />
          <path d={map.primeMeridian} className="map-reference-line" />
        </g>

        {map.labels.map(({ name, x, y }) => (
          <text key={name} x={x} y={y} className="map-label" aria-hidden="true">{name}</text>
        ))}

        {map.oceans.map(({ key, name, x, y }) => (
          <g key={key} role="button" tabIndex={0} aria-label={name} className={`ocean-hotspot${stateClass(name)}`} transform={`translate(${x} ${y})`} onClick={() => onHotspot(name)} onKeyDown={(event) => activate(event, () => onHotspot(name))}>
            <rect x="-48" y="-14" width="96" height="28" rx="10" />
            <text y="4" textAnchor="middle">{name.replace(' Ocean', '')}</text>
          </g>
        ))}
      </svg>
      <div className="map-notes" style={{ color: '#5f7385' }}>
        <p>Map geometry uses Natural Earth 1:50m country boundaries and the Natural Earth I projection.</p>
        <p><strong>Test note:</strong> hemisphere sorting questions follow the teacher’s worksheet key.</p>
      </div>
    </div>
  );
}
