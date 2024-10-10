export const loadPages = async (context) => {
  const pages = [];
  for (const key of context.keys()) {
    const module = await context(key);
    const Component = module.default;
    if (Component.metadata) {
      pages.push({ ...Component.metadata, path: key.replace('./', '').replace('.js', '') });
    }
  }
  return pages;
};
