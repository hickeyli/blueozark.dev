import React from 'react';

function ContentRenderer({ data }) {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.name || item.title}</h2>
          <p>{item.description}</p>
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default ContentRenderer;
