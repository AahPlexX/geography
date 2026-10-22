import type { Stage } from '../types';
import { WorldMap } from './WorldMap';

type Props = {
  stage: Stage;
  onHotspot: (name: string) => void;
  selected?: { name: string; correct: boolean } | null;
};

type StageBodyProps = Omit<Props, 'stage'>;

const selectedClass = (selected: Props['selected'], name: string) =>
  selected?.name === name ? (selected.correct ? ' is-correct' : ' is-wrong') : '';

function GlobeStage({ onHotspot, selected }: StageBodyProps) {
  return (
    <div className="globe-grid" role="group" aria-label="Parts of a globe study diagram">
      <section className="globe-panel">
        <h3>Equator: north and south</h3>
        <div className="globe globe-horizontal" role="group" aria-label="Globe divided by the Equator">
          <button type="button" className={`hemisphere north${selectedClass(selected, 'Northern Hemisphere')}`} onClick={() => onHotspot('Northern Hemisphere')}>Northern Hemisphere</button>
          <button type="button" className={`hemisphere south${selectedClass(selected, 'Southern Hemisphere')}`} onClick={() => onHotspot('Southern Hemisphere')}>Southern Hemisphere</button>
          <button type="button" className={`globe-line equator${selectedClass(selected, 'Equator')}`} onClick={() => onHotspot('Equator')}>Equator · 0°</button>
        </div>
      </section>
      <section className="globe-panel">
        <h3>Prime Meridian: west and east</h3>
        <div className="globe globe-vertical" role="group" aria-label="Globe divided by the Prime Meridian">
          <button type="button" className={`hemisphere west${selectedClass(selected, 'Western Hemisphere')}`} onClick={() => onHotspot('Western Hemisphere')}>Western Hemisphere</button>
          <button type="button" className={`hemisphere east${selectedClass(selected, 'Eastern Hemisphere')}`} onClick={() => onHotspot('Eastern Hemisphere')}>Eastern Hemisphere</button>
          <button type="button" className={`globe-line meridian${selectedClass(selected, 'Prime Meridian')}`} onClick={() => onHotspot('Prime Meridian')}>Prime Meridian</button>
        </div>
      </section>
    </div>
  );
}

const compassPoints = [
  ['North (N)', 'N', 'north'], ['Northeast (NE)', 'NE', 'northeast'], ['East (E)', 'E', 'east'], ['Southeast (SE)', 'SE', 'southeast'],
  ['South (S)', 'S', 'south'], ['Southwest (SW)', 'SW', 'southwest'], ['West (W)', 'W', 'west'], ['Northwest (NW)', 'NW', 'northwest'],
] as const;

// Decorative rose geometry in a 200x200 viewBox centred on 0,0. Each point is a kite split down its axis into a light and dark half.
const compassTicks = Array.from({ length: 24 }, (_, i) => i * 15);
const compassCardinalAngles = [0, 90, 180, 270] as const;
const compassIntermediateAngles = [45, 135, 225, 315] as const;

function CompassRose() {
  return (
    <svg className="compass-rose" viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">
      <circle r="84" className="rose-ring" />
      <circle r="66" className="rose-ring rose-ring-inner" />
      {compassTicks.map((angle) => (
        <line key={angle} className={angle % 45 === 0 ? 'rose-tick rose-tick-major' : 'rose-tick'} y1="-84" y2={angle % 45 === 0 ? -76 : -79} transform={`rotate(${angle})`} />
      ))}
      {compassIntermediateAngles.map((angle) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <polygon className="rose-minor-light" points="0,-56 0,0 -9,-9" />
          <polygon className="rose-minor-dark" points="0,-56 9,-9 0,0" />
        </g>
      ))}
      {compassCardinalAngles.map((angle) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <polygon className="rose-major-light" points="0,-74 0,0 -12,-12" />
          <polygon className="rose-major-dark" points="0,-74 12,-12 0,0" />
        </g>
      ))}
      <circle r="6" className="rose-hub" />
    </svg>
  );
}

function CompassStage({ onHotspot, selected }: StageBodyProps) {
  return (
    <div className="compass-stage">
      <div className="compass" role="group" aria-label="Eight-point compass rose">
        <CompassRose />
        {compassPoints.map(([name, label, position]) => (
          <button type="button" key={name} className={`compass-point ${position}${selectedClass(selected, name)}`} onClick={() => onHotspot(name)} aria-label={name}>{label}</button>
        ))}
      </div>
      <p>Cardinal directions use one letter. Intermediate directions combine two.</p>
    </div>
  );
}

const usItems = [
  ['West', 'Mountains · deserts · Pacific coast'], ['Great Plains', 'Wide flat land · wheat · cattle'], ['Midwest', 'Breadbasket · farms · factories'],
  ['Mid-Atlantic', 'Large cities · Washington, D.C.'], ['New England', 'Forests · lakes · four seasons'], ['South', 'Warm climate · ports · rice'],
] as const;

const usFeatures = ['Canada', 'Mexico', 'Gulf of Mexico', 'Rocky Mountains', 'Appalachian Mountains', 'Great Lakes', 'Alaska and Hawaii'] as const;

function UsStage({ onHotspot, selected }: StageBodyProps) {
  return (
    <div className="us-stage">
      <div className="us-region-flow" role="group" aria-label="United States regions study diagram">
        {usItems.map(([name, detail]) => (
          <button type="button" key={name} className={`us-region ${name.toLowerCase().replaceAll(' ', '-')}${selectedClass(selected, name)}`} onClick={() => onHotspot(name)}>
            <strong>{name}</strong><span>{detail}</span>
          </button>
        ))}
      </div>
      <div className="feature-chips" role="group" aria-label="United States geographic features">
        {usFeatures.map((name) => <button type="button" key={name} className={selectedClass(selected, name)} onClick={() => onHotspot(name)}>{name}</button>)}
      </div>
    </div>
  );
}

const symbols = [
  ['American Flag', '🇺🇸', '50 stars · 13 stripes'], ['Bald Eagle', '🦅', 'National bird'], ['Liberty Bell', '🔔', 'Independence and freedom'],
  ['Statue of Liberty', '🗽', 'Welcomes people to America'], ['The White House', '🏛️', 'President’s home and workplace'], ['Washington Monument', '▴', 'Honors George Washington'],
] as const;

function SymbolsStage({ onHotspot, selected }: StageBodyProps) {
  return (
    <div className="symbols-grid" role="group" aria-label="United States national symbols">
      {symbols.map(([name, icon, detail]) => (
        <button type="button" key={name} className={`symbol-item${selectedClass(selected, name)}`} onClick={() => onHotspot(name)}>
          <span className="symbol-icon" aria-hidden="true">{icon}</span><strong>{name}</strong><span>{detail}</span>
        </button>
      ))}
    </div>
  );
}

export function StudyStage({ stage, onHotspot, selected }: Props) {
  switch (stage) {
    case 'world':
      return <WorldMap onHotspot={onHotspot} selected={selected} />;
    case 'globe':
      return <GlobeStage onHotspot={onHotspot} selected={selected} />;
    case 'compass':
      return <CompassStage onHotspot={onHotspot} selected={selected} />;
    case 'us_map':
      return <UsStage onHotspot={onHotspot} selected={selected} />;
    default:
      return <SymbolsStage onHotspot={onHotspot} selected={selected} />;
  }
}
