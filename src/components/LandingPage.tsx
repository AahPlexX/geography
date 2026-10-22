const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  marginTop: '14px',
} as const;

export function LandingPage() {
  const base = import.meta.env.BASE_URL;

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to choices</a>
      <header className="topbar">
        <div className="topbar-inner" style={{ gridTemplateColumns: '1fr auto' }}>
          <div className="brand-block">
            <span className="brand-mark" aria-hidden="true">🐢</span>
            <div className="brand-copy">
              <p>Grade 3 · test 10/23</p>
              <h1>Geography Study Lab</h1>
            </div>
          </div>
          <a className="secondary-button" style={linkStyle} href={`${base}map/`}>Open map</a>
        </div>
      </header>

      <main id="main-content" className="app-shell">
        <section className="study-reference" aria-labelledby="landing-title">
          <div className="section-heading">
            <div>
              <p>Choose your activity</p>
              <h2 id="landing-title">Ready to study geography?</h2>
            </div>
            <p>The exam starts only when you choose it.</p>
          </div>

          <div className="reference-grid">
            <section>
              <h3>Randomized exam</h3>
              <p>Take all 80 questions in a shuffled order that stays the same if you refresh. A new attempt creates a new order.</p>
              <a className="primary-button" style={linkStyle} href={`${base}exam/?view=quiz`}>Start exam</a>
            </section>

            <section>
              <h3>Study and practice</h3>
              <p>Practice the same material with hints, feedback, filters, score history, and question-specific visuals.</p>
              <a className="secondary-button" style={linkStyle} href={`${base}exam/?view=practice`}>Practice questions</a>
            </section>

            <section>
              <h3>Standalone world map</h3>
              <p>Explore the full Natural Earth world map without answering, changing, or scoring any exam question.</p>
              <a className="secondary-button" style={linkStyle} href={`${base}map/`}>View world map</a>
            </section>

            <section>
              <h3>Study sheet</h3>
              <p>Review the geography reference material and diagrams without submitting answers from the study diagrams.</p>
              <a className="secondary-button" style={linkStyle} href={`${base}exam/?view=study`}>Open study sheet</a>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
