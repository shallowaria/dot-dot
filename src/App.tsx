import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

interface Game {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const games: Game[] = [
  {
    id: 1,
    title: "Start Scene",
    description: "Dive into a pixel world by Dot-Dot!.",
    tags: ["解谜", "知识锁", "游玩岛国音游被抓队"],
    image: "/images/image1.webp",
  },
  {
    id: 2,
    title: "Scene2",
    description: "I'm Red Now",
    tags: ["解谜", "知识锁", "游玩岛国音游被抓队"],
    image: "/images/image2.webp",
  },
  {
    id: 3,
    title: "Scene3",
    description: "I'm Purple Now",
    tags: ["解谜", "知识锁", "游玩岛国音游被抓队"],
    image: "/images/image3.webp",
  },
  {
    id: 4,
    title: "Scene4",
    description: "I'm Blue Now",
    tags: ["解谜", "知识锁", "游玩岛国音游被抓队"],
    image: "/images/image4.webp",
  },
];

function App() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const nextGame = () => {
    setCurrentGameIndex((prev) => (prev + 1) % games.length);
  };

  const prevGame = () => {
    setCurrentGameIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const goToGame = (index: number) => {
    setCurrentGameIndex(index);
  };

  return (
    <div className="app">
      {/* Custom Cursor */}
      <div
        className={`custom-cursor ${isHovering ? "hovering" : ""}`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-logo">Dot - Dot</div>
        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#games">Games</a>
          </li>
          {/* <li>
            <a href="#community">Community</a>
          </li> */}
          <li>
            <a href="#download">Download</a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background" />

        <div className="floating-elements">
          <div className="floating-cube" />
          <div className="floating-cube" />
          <div className="floating-cube" />
        </div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Download Dot - Dot
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Where Legends Are Born
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <button
              className="btn btn-primary"
              onClick={() => {
                const section = document.getElementById("download");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Play Now
            </button>
            <a
              href="https://www.gmhub.com/game/9413"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              See on GMHub
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Games Showcase Section */}
      <section id="games" className="games-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Featured Screenshot</h2>
          <p className="section-subtitle">Discover Your Next Picture</p>
        </motion.div>

        <div className="games-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGameIndex}
              className="game-card"
              initial={{ opacity: 0, x: 100, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: 15 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="game-image">
                <img
                  src={games[currentGameIndex].image}
                  alt="Game screenshot"
                />
              </div>
              <h3 className="game-title">{games[currentGameIndex].title}</h3>
              <p className="game-description">
                {games[currentGameIndex].description}
              </p>
              <div className="game-tags">
                {games[currentGameIndex].tags.map((tag, index) => (
                  <span key={index} className="game-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="carousel-controls">
            <button
              className="carousel-btn"
              onClick={prevGame}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              aria-label="Previous Game"
            >
              &#8249;
            </button>
            <button
              className="carousel-btn"
              onClick={nextGame}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              aria-label="Next Game"
            >
              &#8250;
            </button>
          </div>

          <div className="carousel-dots">
            {games.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentGameIndex ? "active" : ""}`}
                onClick={() => goToGame(index)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                aria-label={`Go to game ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      {/* <section id="community" className="community-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Join The Community</h2>
          <p className="section-subtitle">Connect With Millions Of Players</p>
        </motion.div>

        <div className="community-grid">
          <motion.div
            className="community-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="community-icon">👥</div>
            <h3 className="community-title">Active Players</h3>
            <p className="community-description">
              Join millions of gamers worldwide in epic battles and
              unforgettable adventures.
            </p>
            <div className="community-stat">5.2M+</div>
          </motion.div>

          <motion.div
            className="community-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="community-icon">🏆</div>
            <h3 className="community-title">Tournaments</h3>
            <p className="community-description">
              Compete in weekly tournaments and championships with massive prize
              pools.
            </p>
            <div className="community-stat">$500K+</div>
          </motion.div>

          <motion.div
            className="community-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="community-icon">🎮</div>
            <h3 className="community-title">Game Modes</h3>
            <p className="community-description">
              Experience diverse gameplay across multiple genres and innovative
              mechanics.
            </p>
            <div className="community-stat">50+</div>
          </motion.div>

          <motion.div
            className="community-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="community-icon">⚡</div>
            <h3 className="community-title">Live Events</h3>
            <p className="community-description">
              Participate in seasonal events with exclusive rewards and
              limited-time challenges.
            </p>
            <div className="community-stat">24/7</div>
          </motion.div>
        </div>
      </section> */}

      {/* Download Section */}
      <section id="download" className="download-section">
        <motion.div
          className="download-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="download-title">准备好下载了吗？</h2>
          <p className="download-description">
            {/* Download Dot-Dot now and join the revolution. Available on all major
            platforms with cross-play support and cloud saves. */}
            即刻下载 Dot - Dot.
          </p>

          <div className="download-buttons">
            <a
              href="https://pan.baidu.com/share/init?surl=DwJVeRwK5D3tJKyE8XrHhw&pwd=1234"
              rel="noopener noreferrer"
              target="_blank"
              className="platform-btn"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="platform-icon">☁️</span>
              <span>百度网盘</span>
            </a>
            {/* <button
              className="platform-btn"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="platform-icon">🍎</span>
              <span>macOS</span>
            </button>
            <button
              className="platform-btn"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="platform-icon">🎮</span>
              <span>Console</span>
            </button>
            <button
              className="platform-btn"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="platform-icon">📱</span>
              <span>Mobile</span>
            </button> */}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            &copy; 2026 游玩岛国音游被抓队. All Rights Reserved.
          </p>
          <div className="social-links">
            <a
              href="#"
              className="social-link"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              🐦
            </a>
            <a
              href="#"
              className="social-link"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              📷
            </a>
            <a
              href="#"
              className="social-link"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              💬
            </a>
            <a
              href="#"
              className="social-link"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              🎥
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
