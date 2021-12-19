import React from 'react';

import Button from '../../../../components/UI/Button';

import classes from './ProjectDetails.module.scss';
import { Project } from '../../../../entity/Project';

interface Props {
  project: Project;
}

const ProjectDetails = (props: Props) => {
  const projectData: Project = props.project;

  return (
    <div className={classes['project-details']}>
      <div className={classes['project-details__header']}>
        <div className={classes['project-details__title']}>Проект {projectData.id}</div>

        {/*TODO: Fix square*/}
        <div className={classes['project-details__square']}>
          {projectData.livingArea} м<sup>2</sup>
        </div>
      </div>
      <div className={classes['project-details__description']}>{projectData.description}</div>

      <div className={classes['project-details__footer']}>
        <div className={classes['project-details__price']}>
          {projectData.projectPrice} грн.
          <span className={classes['project-details__price-info']}>цена проекта</span>
        </div>
        <a href="#" className={classes['project-details__link']}>
          <Button title={'Подробнее'} />
        </a>
      </div>
    </div>
  );
};

export default ProjectDetails;
