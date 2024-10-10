import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, CircularProgress } from '@mui/material';
import '../styles/ResourcePage.css';

const ProjectPage = () => {
  const { projectKey } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ProjectComponent, setProjectComponent] = useState(null);

  useEffect(() => {
    console.log(`Attempting to load project: ${projectKey}`);
    // Convert projectKey to PascalCase and append 'Page'
    const componentName = projectKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Page';
    console.log(`Looking for component: ${componentName}`);
    
    import(`../pages/projects/${componentName}`)
      .then(module => {
        console.log('Project module loaded successfully:', module);
        setProjectComponent(() => module.default);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load project:", err);
        setError(`Failed to load project: ${err.message}`);
        setLoading(false);
      });
  }, [projectKey]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!ProjectComponent) {
    return <Typography>No project component found</Typography>;
  }

  return (
    <Container className="project-container">
      <Button onClick={() => navigate('/')} className="button" style={{ marginTop: '20px' }}>
        Back to Home
      </Button>
      <ProjectComponent />
    </Container>
  );
};

export default ProjectPage;
