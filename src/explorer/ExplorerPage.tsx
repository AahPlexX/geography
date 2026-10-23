export function ExplorerPage() {
  const base = import.meta.env.BASE_URL;

  return (
    <>
      <a className="skip-link" href="#explorer-main">Skip to explorer</a>
      <header className="topbar">
        <div className="topbar-inner" style={{ gridTemplateColumns: '1fr auto' }}>
          <div className="brand-block">
            <span className="brand-mark" aria-hidden="true">🌎</span>
            <div className="brand-copy">
              <p>Geography Study Lab · world atlas</p>
              <h1>Interactive World Explorer</h1>
            </div>
          </div>
          <a className="secondary-button" href={base}>Back to study lab</a>
        </div>
      </header>

      <main id="explorer-main" className="app-shell">
        <section className="study-reference" aria-labelledby="explorer-title">
          <div className="section-heading">
            <div>
              <p>Explore, select, and learn</p>
              <h2 id="explorer-title">Explore the world</h2>
            </div>
            <p>This atlas is separate from the exam and will never change your quiz answers or score.</p>
          </div>

          <div className="reference-grid">
            <section aria-labelledby="explorer-loading-title">
              <h3 id="explorer-loading-title">Interactive atlas</h3>
              <p>Country and continent search, selection, and map controls are loading into this dedicated explorer workspace.</p>
              <p role="status" aria-live="polite">Explorer map and search are loading.</p>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
