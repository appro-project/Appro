import React from 'react';
import classes from './VisitedProjects.module.scss';
import { Project } from '../../entity/Project';
import ProjectDetails from '../ProjectDetails';
import { useSelector } from 'react-redux';
import { getViewProjects } from '../../redux/selectors';

const VisitedProjects = () => {
  const projects = useSelector(getViewProjects);

  return (
    <section>
      {projects && (
        <>
          <h2 className={classes['visited-projects__title']}>Просмотренные проекты</h2>

          <div className={classes['visited-projects__items']}>
            {projects
              .filter((x, index) => index < 3)
              .map((project: Project, idx: number) => (
                <div className={classes.VisitedProjects_ProjectWrapper} key={idx}>
                  <ProjectDetails projectData={project} />
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  );
};

export default VisitedProjects;
