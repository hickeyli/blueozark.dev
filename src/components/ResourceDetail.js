import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Container, Typography } from '@mui/material';
import resourcesData from './resources/resources.json';

function ResourceDetail() {
  const { resourceId } = useParams();
  const resource = resourcesData.find((r) => r.id === parseInt(resourceId));
  const [content, setContent] = useState('');

  useEffect(() => {
    if (resource) {
      fetch(process.env.PUBLIC_URL + resource.contentPath)
        .then((response) => response.text())
        .then((text) => setContent(text))
        .catch((error) => console.error('Error fetching markdown:', error));
    }
  }, [resource]);

  if (!resource) {
    return <Typography variant="h6">Resource not found.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {resource.name}
      </Typography>
      <ReactMarkdown>{content}</ReactMarkdown>
    </Container>
  );
}

export default ResourceDetail;
