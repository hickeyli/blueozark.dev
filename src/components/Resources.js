// Resources.js
import React from 'react';
// import resources from './resources'; // Array of resource data

function Resources() {
  return (
    <section id="resources" className="resources">
      <h2>Developer Resources</h2>
      <div className="resource-list">
        {/* {resources.map((resource) => (
          <div className="resource-item" key={resource.id}>
            <h3>{resource.name}</h3>
            <p>{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">Visit Site</a>
          </div>
        ))} */}
      </div>
    </section>
  );
}

export default Resources;
