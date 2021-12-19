import React from 'react';
import classes from './VisitedProjects.module.scss';
import { Project } from '../../entity/Project';
import ProjectDetails from '../ProjectDetails';
import { useSelector } from 'react-redux';
import { getProjects } from '../../redux/selectors';

const VisitedProjects = () => {
  const mockProjects = useSelector(getProjects);
  const data = [...mockProjects];
  data.push(mockProjects[0]);
  data.push(mockProjects[0]);

  return (
    <section>
      <h2 className={classes['visited-projects__title']}>Просмотренные проекты</h2>

      <div className={classes['visited-projects__items']}>
        {data.map((project: Project, idx: number) => (
          <div className={classes.VisitedProjects_ProjectWrapper} key={idx}>
            <ProjectDetails projectData={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisitedProjects;
