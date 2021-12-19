import React from 'react';
import classes from './ProjectList.module.scss';
import { Project } from '../../../entity/Project';
import ProjectDetails from '../../../containers/ProjectDetails';

interface Props {
  projects: Project[];
}
const ProjectList = React.memo(({ projects }: Props) => {
  return (
    <div className={classes['project-list__items']}>
      {projects.map((project: Project, idx: number) => (
        <ProjectDetails key={idx} projectData={project} />
      ))}
    </div>
  );
});

export default ProjectList;
