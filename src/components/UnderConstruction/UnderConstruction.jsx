import './UnderConstruction.css'

function UnderConstruction({ title }) {
  return (
    <main className="under-construction">
      <div className="under-construction-content">
        <span className="under-construction-icon">🚧</span>
        <h1>{title}</h1>
        <p>This page is under construction. Check back soon!</p>
      </div>
    </main>
  )
}

export default UnderConstruction
