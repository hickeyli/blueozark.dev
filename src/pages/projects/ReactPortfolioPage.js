import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const ReactPortfolioPage = () => {
  return (
    <>
      <Typography variant="h2" component="h1" gutterBottom>
        React Portfolio
      </Typography>
      <Box my={4}>
        <img src="https://example.com/react-portfolio.jpg" alt="React Portfolio" style={{ maxWidth: '100%', borderRadius: '10px' }} />
      </Box>
      <Typography variant="body1" paragraph style={{ color: 'black' }}>
        A responsive portfolio website built with React.
      </Typography>
      <Typography variant="body1" style={{ color: 'ash-black' }} paragraph>
        This project showcases a modern, responsive portfolio website built using React...
      </Typography>
      <Button variant="contained" color="primary" href="https://example.com/react-portfolio-demo" target="_blank">
        View Demo
      </Button>
    </>
  );
};

ReactPortfolioPage.metadata = {
  key: 'react-portfolio',
  title: 'React Portfolio',
  description: 'A responsive portfolio website built with React.',
  category: 'project',
};

export default ReactPortfolioPage;
