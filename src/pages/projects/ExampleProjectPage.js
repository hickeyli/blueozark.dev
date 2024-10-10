import React, { useEffect } from 'react';
import { Typography, Button, Box, Container } from '@mui/material';

const ExampleProjectPage = () => {
  useEffect(() => {
    console.log("ExampleProjectPage component mounted");
  }, []);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Example Project
        </Typography>
        <Box my={4}>
          <img 
            src="https://example.com/example-project.jpg" 
            alt="Example Project" 
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} 
          />
        </Box>
        <Typography variant="body1" paragraph style={{ color: 'black', fontSize: '16px' }}>
          This is an example project to demonstrate navigation.
        </Typography>
        <Typography variant="body1" paragraph>
          Here's some more detailed information about the example project...
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          href="https://example.com/example-project-demo" 
          target="_blank"
          rel="noopener noreferrer"
        >
          View Demo
        </Button>
      </Box>
    </Container>
  );
};

ExampleProjectPage.metadata = {
  key: 'example-project',
  title: 'Example Project',
  description: 'An example project to demonstrate navigation.',
  category: 'project',
};

export default ExampleProjectPage;
