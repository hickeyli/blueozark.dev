import { useState, useEffect } from "react";

const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const projectContext = require.context('../pages/projects', false, /\.js$/);
        console.log('Project files found:', projectContext.keys());

        const projectItems = await Promise.all(
          projectContext.keys().map(async (key) => {
            console.log(`Loading project file: ${key}`);
            const module = await import(`../pages/projects/${key.slice(2)}`);
            console.log(`Loaded module:`, module);
            return module.default.metadata;
          })
        );

        const resourceContext = require.context('../pages/resources', false, /\.js$/);
        console.log('Resource files found:', resourceContext.keys());

        const resourceItems = await Promise.all(
          resourceContext.keys().map(async (key) => {
            console.log(`Loading resource file: ${key}`);
            const module = await import(`../pages/resources/${key.slice(2)}`);
            console.log(`Loaded module:`, module);
            return module.default.metadata;
          })
        );

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