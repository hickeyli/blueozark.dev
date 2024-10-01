// Portfolio.js

import React, { useState } from 'react';
import projectsData from './projects/projects.js'; // Import your projects data
import '../styles/Portfolio.css';


function Portfolio() {
  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // List of categories for filtering buttons
  const categories = ['All', 'FiveM', 'AI', 'Web Development'];

  // Function to handle category filter change
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter projects based on selected category and search term
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;

    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="portfolio" className="portfolio">
      <h2>My Portfolio</h2>

      {/* Search Input */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Category Filters */}
      <div className="portfolio-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-button ${
              selectedCategory === category ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="portfolio-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div className="portfolio-item" key={project.id}>
              <img src={project.image} alt={project.title} />
              <div className="portfolio-item-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </section>
  );
}

export default Portfolio;

