// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
// import Showcase from './components/Showcase.js';
// import Blog from './components/Blog.js';
import Resources from './components/Resources.js';
import Portfolio from './components/Portfolio.js';
import ResourceDetail from './components/ResourceDetail.js'; // Import the ResourceDetail component
import ProjectDetail from './components/ProjectDetail.js'; // Import the ProjectDetail component

function App() {
  return (
    <Router>
      <Header />
      <Routes >
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resource/:resourceId" element={<ResourceDetail />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;