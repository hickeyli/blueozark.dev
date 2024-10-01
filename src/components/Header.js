// In App.js or Header.js
import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="hero">
      <nav className="navigation">
        <div className="logo">Blue Ozark Development</div>
        <ul className="nav-links">
          <li><a href="#blog">Blog</a></li>
          <li><a href="#resources">Resources</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
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
