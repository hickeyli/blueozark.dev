import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectPage = () => {
  const { projectKey } = useParams(); // Get project key from URL params
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    console.log("Rendering ProjectPage for projectKey:", projectKey);

    const fetchProjectData = async () => {
      try {
        // const sanitizedKey = projectKey.replace(/-/g, "/"); // Revert sanitized key for fetching
        // console.log("Fetching project data for:", sanitizedKey);
        const response = await axios.get(`https://blueozark-data.s3.us-east-2.amazonaws.com/${projectKey}`);
        setProjectData(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };
    fetchProjectData();
  }, [projectKey]);

  return (
    <div style={{ padding: '20px' }}>
      {projectData ? (
        <>
          <h1>{projectData.title}</h1>
          <p>{projectData.description}</p>
          {/* Render markdown content here */}
          <div dangerouslySetInnerHTML={{ __html: projectData.content }} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProjectPage;
