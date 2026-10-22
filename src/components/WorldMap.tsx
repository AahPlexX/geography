import { useEffect, useMemo, useState, type CSSProperties, type KeyboardEvent } from 'react';
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

function activate(event: KeyboardEvent<SVGGElement>, action: () => void) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    action();
  }
}

export function WorldMap({ onHotspot, selected }: Props) {
  const [world, setWorld] = useState<WorldData | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}data/world-countries.geojson`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Map request failed with ${response.status}`);
        return response.json();
      })
      .then((data: WorldData) => setWorld(data))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setLoadError(true);
      });
    return () => controller.abort();
  }, []);

  const map = useMemo(() => {
    if (!world) return null;
    const projection = geoNaturalEarth1().fitExtent([[18, 18], [782, 402]], world as never);
    return { projection, path: geoPath(projection), groups: groupFeaturesByContinent(world.features) };
  }, [world]);

  if (loadError) {
    return <div className="map-status" role="alert">The detailed map asset did not load. Refresh the page; the answer buttons remain available.</div>;
  }

  if (!map) {
    return <div className="map-status" role="status" aria-live="polite">Loading detailed world geography…</div>;
  }

  const equator = { type: 'LineString', coordinates: Array.from({ length: 73 }, (_, i) => [-180 + i * 5, 0]) };
  const primeMeridian = { type: 'LineString', coordinates: Array.from({ length: 35 }, (_, i) => [0, -85 + i * 5]) };
  const stateClass = (name: string) => selected?.name === name ? (selected.correct ? ' is-correct' : ' is-wrong') : '';

  return (
    <div className="world-map-wrap">
      <svg className="world-map" viewBox="0 0 800 420" role="group" aria-labelledby="world-map-title world-map-desc">
        <title id="world-map-title">Interactive world map</title>
        <desc id="world-map-desc">Natural Earth country boundaries grouped into seven keyboard-operable continents, with the Equator, Prime Meridian, and five oceans labeled.</desc>
        <path d={map.path({ type: 'Sphere' } as never) ?? ''} className="map-ocean" />
        <path d={map.path(geoGraticule10() as never) ?? ''} className="map-graticule" />

        {Object.entries(map.groups).map(([name, features]) => (
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
            {features.map((feature) => (
              <path key={feature.properties.ADM0_A3 ?? feature.properties.NAME} d={map.path(feature as never) ?? ''} />
            ))}
          </g>
        ))}

        <g role="button" tabIndex={0} aria-label="Equator" className={`map-reference equator${stateClass('Equator')}`} onClick={() => onHotspot('Equator')} onKeyDown={(event) => activate(event, () => onHotspot('Equator'))}>
          <path d={map.path(equator as never) ?? ''} className="map-reference-hit" />
          <path d={map.path(equator as never) ?? ''} className="map-reference-line" />
        </g>
        <g role="button" tabIndex={0} aria-label="Prime Meridian" className={`map-reference meridian${stateClass('Prime Meridian')}`} onClick={() => onHotspot('Prime Meridian')} onKeyDown={(event) => activate(event, () => onHotspot('Prime Meridian'))}>
          <path d={map.path(primeMeridian as never) ?? ''} className="map-reference-hit" />
          <path d={map.path(primeMeridian as never) ?? ''} className="map-reference-line" />
        </g>

        {Object.entries(labelPoints).map(([name, coordinates]) => {
          const point = map.projection(coordinates);
          return point ? <text key={name} x={point[0]} y={point[1]} className="map-label" aria-hidden="true">{name}</text> : null;
        })}

        {oceanPoints.map(([name, lon, lat], index) => {
          const point = map.projection([lon, lat]);
          if (!point) return null;
          return (
            <g key={`${name}-${index}`} role="button" tabIndex={0} aria-label={name} className={`ocean-hotspot${stateClass(name)}`} transform={`translate(${point[0]} ${point[1]})`} onClick={() => onHotspot(name)} onKeyDown={(event) => activate(event, () => onHotspot(name))}>
              <rect x="-48" y="-14" width="96" height="28" rx="10" />
              <text y="4" textAnchor="middle">{name.replace(' Ocean', '')}</text>
            </g>
          );
        })}
      </svg>
      <div className="map-notes" style={{ color: '#5f7385' }}>
        <p>Map geometry uses Natural Earth 1:50m country boundaries and the Natural Earth I projection.</p>
        <p><strong>Test note:</strong> hemisphere sorting questions follow the teacher’s worksheet key.</p>
      </div>
    </div>
  );
}
