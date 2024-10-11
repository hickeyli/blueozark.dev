import React from 'react';
import { Container, Typography } from '@mui/material';

const ExampleResourcePage = () => {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Example Resource
      </Typography>
      <Typography variant="body1" paragraph>
        This is an example resource page to demonstrate navigation.
      </Typography>
    </Container>
  );
};

// Static metadata
ExampleResourcePage.metadata = {
  key: 'example-resource',
  title: 'Example Resource',
  description: 'An example resource to demonstrate navigation.',
  category: 'resource',
};

export default ExampleResourcePage;
