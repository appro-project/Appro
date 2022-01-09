export const setProjectInLocalStorage = (projects: number[]) => {
  localStorage.setItem('viewProject', JSON.stringify(projects));
};

export const getProjectInLocalStorage = () => {
  const item = localStorage.getItem('viewProject');
  return item ? JSON.parse(item) : [];
};
