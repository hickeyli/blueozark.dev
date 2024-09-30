// Footer.js
import React from 'react';
import './Footer.css'; // Create this CSS file

function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Blue Ozark Development. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
