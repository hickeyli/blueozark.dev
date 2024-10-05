// Portfolio.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button, Divider } from '@mui/material';
import { listProjectFiles } from '../utils/s3Utils';
import '../styles/Portfolio.css';

function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const fileKeys = await listProjectFiles();
      const projectPromises = fileKeys.map(async (key) => {
        const response = await fetch(`https://blueozark-data.s3.us-east-2.amazonaws.com/${key}`);
        const text = await response.text();
        // Parse the markdown file to extract metadata and content
        const [metadata, ...content] = text.split('\n');
        const [title, category, description] = metadata.split(';');
        return { title, category, description, content: content.join('\n'), key };
      });

      const projectsData = await Promise.all(projectPromises);
      setProjects(projectsData);
    };

    fetchProjects();
  }, []);

  return (
    <Container className="portfolio-container">
      <Typography variant="h4" component="h1" className="portfolio-header" gutterBottom>
        Portfolio
      </Typography>

      <Divider className="divider" />

      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {project.description}
                </Typography>
                <Button component={Link} to={`/${project.key}`} variant="contained" color="primary">
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

export default Portfolio;

