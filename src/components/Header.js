import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="hero">
      <nav className="navigation">
        <div className="logo">Blue Ozark Development</div>
        <ul className="nav-links">
          {/* <li><Link to="/blog">Blog</Link></li> */}
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
        </ul>
      </nav>
      <div className="hero-content">
        <h1>Innovative Development Solutions</h1>
        <p>Innovative Solutions in FiveM, AI, and Web Development.</p>
        {/* <a href="#contact" className="cta-button">Get in Touch</a> */}
      </div>
    </header>
  );
}

export default Header;
