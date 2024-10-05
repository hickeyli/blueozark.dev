import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../styles/ProjectDetail.css';

function ProjectDetail() {
  const [content, setContent] = useState('');
  const { projectId } = useParams();

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const url = `https://blueozark-data.s3.us-east-2.amazonaws.com/projects/${projectId}`;
        console.log('Fetching markdown from:', url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        console.log('Fetched markdown content:', text);
        setContent(text);
      } catch (error) {
        console.error('Error fetching markdown:', error);
      }
    };

    fetchMarkdown();
  }, [projectId]);

  return (
    <div className='project-detail'>
      <ReactMarkdown className='project-detail-content'>{content}</ReactMarkdown>
    </div>
  );
}

export default ProjectDetail;
