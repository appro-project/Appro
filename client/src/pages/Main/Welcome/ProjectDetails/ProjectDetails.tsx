import { Button } from '@/components/UI/Button/Button'

import classes from './ProjectDetails.module.scss'
import { Project } from '@/entity/Project'
import { Link } from 'react-router-dom'
import {ProjectDto} from "@/api/model";
import {FC} from "react";

interface Props {
  project: ProjectDto;
}

export const ProjectDetails:FC<Props> = ({project}) => {

  return (
    <div className={classes['project-details']}>
      <div className={classes['project-details__header']}>
        <div className={classes['project-details__title']}>Проект {project.title}</div>

        {/*TODO: Fix square*/}
        <div className={classes['project-details__square']}>
          {project.livingArea} м<sup>2</sup>
        </div>
      </div>
      <div className={classes['project-details__description']}>{project.description}</div>

      <div className={classes['project-details__footer']}>
        <div className={classes['project-details__price']}>
          {project.projectPrice} грн.
          <span className={classes['project-details__price-info']}>цена проекта</span>
        </div>
        <Link to={`/catalogue/${project.id}`} className={classes['project-details__link']}>
          <Button title={'Подробнее'} />
        </Link>
      </div>
    </div>
  );
};

