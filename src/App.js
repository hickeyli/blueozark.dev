// App.js

import React from 'react';
import Header from './components/Header.js';
// Uncomment the following lines if you have created these components
import Showcase from './components/Showcase.js';
import Blog from './components/Blog.js';
import Resources from './components/Resources.js';
import Portfolio from './components/Portfolio.js';


function App() {
  return (
    <div className="App">
      <Header />
      {/* Include additional sections as you create them */}
      <Portfolio />
      {/* <Blog /> */}
      {/* <Resources /> */}
    </div>
  );
}

export default App;