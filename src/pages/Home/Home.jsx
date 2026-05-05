import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./Home.css";

// /api/avatar is a local proxy that generates a random seed and fetches from DiceBear.
// Every request returns a different avatar — but the service worker caches it under
// this fixed URL. So online = new avatar each refresh, offline = last cached avatar.
const AVATAR_URL = "/api/avatar";

function Home() {
  return (
    <main>
      <section id="home" className="hero">
        <div className="hero-inner">
          <div className="hero-image">
            <img src={AVATAR_URL} alt="Profile photo" />
          </div>
          <div className="hero-content">
            <p className="hero-greeting">Hi, I'm</p>
            <h1 className="hero-name">Your Name</h1>
            <p className="hero-tagline">Software Developer</p>
            <p className="hero-description">
              I love building clean, fast, and user-friendly applications.
              Currently looking for new opportunities to grow and create.
            </p>
            <div className="hero-actions">
              <Button as={Link} to="/projects" variant="primary">
                View my work
              </Button>
              <Button as={Link} to="/contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
