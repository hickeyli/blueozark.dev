import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import resourcesData from './resources/resourcesData.js';
import '../styles/Resources.css';

function Resources() {
  return (
    <Container>
      <Typography variant="h4" component="h1" className="resources-header" gutterBottom>
        Developer Resources
      </Typography>
      <Grid container spacing={4}>
        {resourcesData.map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {resource.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {resource.description}
                </Typography>
                <Button component={Link} to={`/resource/${resource.id}`} variant="contained" color="primary">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Resources;
