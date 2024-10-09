import { useState, useEffect } from "react";

const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const projectsResponse = await fetch('/projects.json');
        const resourcesResponse = await fetch('/resources.json');
        
        const projectsFiles = await projectsResponse.json();
        console.log(projectsFiles);
        const resourcesFiles = await resourcesResponse.json();

        const fetchAndParseFile = async (file, category) => {
          const response = await fetch(`/${category}/${file}`);
          const content = await response.text();
          const [metadata, ...rest] = content.split('\n');
          const [title, fileCategory, description] = metadata.split(';').map(item => item.trim());
          console.log(title, fileCategory, description);
          return { name: title, category: fileCategory, description, file, content: rest.join('\n') };
        };

        const projectItems = await Promise.all(projectsFiles.map(file => fetchAndParseFile(file, 'projects')));
        const resourceItems = await Promise.all(resourcesFiles.map(file => fetchAndParseFile(file, 'resources')));

        setItems([...projectItems, ...resourceItems]);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return items;
};

export default useItems;