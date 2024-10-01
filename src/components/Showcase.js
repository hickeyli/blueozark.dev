// Showcase.js
import React from 'react';
// import projects from './projects'; // Array of project data

function Showcase() {
  return (
    <section id="showcase" className="showcase">
      <h2>Project Showcase</h2>
      <div className="project-gallery">
        {/* {projects.map((project) => (
          <div className="project-item" key={project.id}>
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">Learn More</a>
          </div>
        ))} */}
      </div>
    </section>
  );
}

export default Showcase;
