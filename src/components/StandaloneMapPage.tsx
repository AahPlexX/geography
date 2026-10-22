import { useState } from 'react';
import { WorldMap } from './WorldMap';

const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
} as const;

export function StandaloneMapPage() {
  const base = import.meta.env.BASE_URL;
  const [selectedName, setSelectedName] = useState('');

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to map</a>
      <header className="topbar">
        <div className="topbar-inner" style={{ gridTemplateColumns: '1fr auto' }}>
          <div className="brand-block">
            <span className="brand-mark" aria-hidden="true">🌎</span>
            <div className="brand-copy">
              <p>Reference page</p>
              <h1>Geography Map</h1>
            </div>
          </div>
          <a className="secondary-button" style={linkStyle} href={base}>Back home</a>
        </div>
      </header>

      <main id="main-content" className="app-shell">
        <section className="stage-panel" aria-labelledby="standalone-map-title">
          <div className="stage-toolbar">
            <div>
              <p>Standalone reference</p>
              <h2 id="standalone-map-title">World map</h2>
            </div>
            <a className="primary-button" style={linkStyle} href={`${base}exam/?view=quiz`}>Start exam</a>
          </div>
          <div className="stage-canvas">
            <WorldMap onHotspot={setSelectedName} />
          </div>
          <div className="stage-note" aria-live="polite">
            <span>This map is for reference only. Selecting a place here never changes exam answers or scores.</span>
            {selectedName && <strong>Selected: {selectedName}</strong>}
          </div>
        </section>
      </main>
    </>
  );
}
