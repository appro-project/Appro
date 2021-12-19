import React from 'react';
import Welcome from './Welcome';
import Popular from './Popular';
import Principles from './Principles';
import Feedback from './Feedback';
import About from './About';
import { useSelector } from 'react-redux';
import { getPopularCategories, getPrinciplesData, getProjects } from '../../redux/selectors';

const Index = () => {
  const mockProjects = useSelector(getProjects);
  const popularCategories = useSelector(getPopularCategories);
  const principlesData = useSelector(getPrinciplesData);

  return (
    <>
      <Welcome mockProjects={mockProjects} />
      <Popular popularCategories={popularCategories} />
      <About />
      <Principles principlesData={principlesData} />
      <Feedback />
    </>
  );
};

export default Index;
