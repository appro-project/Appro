import classes from './ProjectItem.module.scss'
import Overlay from '@/components/UI/Overlay/Overlay'
import ProjectDetails from '../ProjectDetails/ProjectDetails'
import React from 'react'
import { Project } from '@/entity/Project'
import { currentHost } from '@/services/server-data'

interface PropsType {
  project: Project;
}

const ProjectItem = ({ project }: PropsType) => {
  return (
    <div>
      <div className={classes['welcome__project-image']}>
        <img src={`${currentHost}${project.mainImage}`} alt="slide 1" />
        <Overlay />
      </div>
      <div className={classes['welcome__project-details-wrapper']}>
        <ProjectDetails project={project} />
      </div>
    </div>
  );
};

export default ProjectItem;
