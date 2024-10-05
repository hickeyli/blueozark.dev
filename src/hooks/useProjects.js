import { useState, useEffect } from "react";
import AWS from "aws-sdk";
import axios from "axios";

const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const s3 = new AWS.S3({
        region: "us-east-2",
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      });

      try {
        const params = { Bucket: "blueozark-data", Prefix: "projects/" };
        const response = await s3.listObjectsV2(params).promise();
        const fileKeys = response.Contents.map((item) => item.Key);

        const projectPromises = fileKeys.map(async (key) => {
          const response = await axios.get(`https://blueozark-data.s3.us-east-2.amazonaws.com/${key}`);
          const text = response.data;
          const [metadata, ...content] = text.split('\n');
          const [title, category, description] = metadata.split(';');
          return { title, category, description, content: content.join('\n'), key };
        });

        const projectsData = await Promise.all(projectPromises);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return projects;
};

export default useProjects;
