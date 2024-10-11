import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, CircularProgress } from '@mui/material';
import '../styles/ResourcePage.css';

const ResourcePage = () => {
  const { resourceKey } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ResourceComponent, setResourceComponent] = useState(null);

  useEffect(() => {
    console.log(`Attempting to load resource: ${resourceKey}`);
    // Convert resourceKey to PascalCase and append 'Page'
    const componentName = resourceKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Page';
    console.log(`Looking for component: ${componentName}`);
    
    import(`../pages/resources/${componentName}`)
      .then(module => {
        console.log('Resource module loaded successfully:', module);
        setResourceComponent(() => module.default);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load resource:", err);
        setError(`Failed to load resource: ${err.message}`);
        setLoading(false);
      });
  }, [resourceKey]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!ResourceComponent) {
    return <Typography>No resource component found</Typography>;
  }

  return (
    <Container className="resource-container">
      <Button onClick={() => navigate(-1)} className="button1" style={{ marginTop: '100px' }}>
        Back to Home
      </Button>
      <ResourceComponent />
    </Container>
  );
};

export default ResourcePage;
