import { Link } from 'react-router-dom'
import './Nav.css'

function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">Your Name</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}

export default Nav
