// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Create this CSS file

function Header() {
  return (
    <header>
      <div className="logo">
        <Link to="/">Blue Ozark Development</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/tutorials">Tutorials</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
