import React, { lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import '../styles/ResourcePage.css';

const ResourcePage = () => {
  const { resourceKey } = useParams();
  const navigate = useNavigate();
  
  // Dynamically import the resource component
  const ResourceComponent = lazy(() => import(`../pages/resources/${resourceKey}`).catch(() => {
    // If the import fails, return a default component
    return { default: () => <Typography>Resource not found</Typography> };
  }));

  return (
    <Container className="resource-container">
      <Button onClick={() => navigate(-1)} className="button" style={{ marginTop: '20px' }}>
        Back
      </Button>
      <Suspense fallback={<Typography>Loading resource...</Typography>}>
        <ResourceComponent />
      </Suspense>
    </Container>
  );
};

export default ResourcePage;
