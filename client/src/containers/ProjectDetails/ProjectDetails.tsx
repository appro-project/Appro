
import classes from './ProjectDetails.module.scss'
import { Project } from '@/entity/Project'
import  {Button, ButtonType } from '@/components/UI/Button/Button'
import { Link } from 'react-router-dom'
import { memo } from 'react'

interface Props {
  projectData: Project;
}

export const ProjectDetails = memo(({ projectData }: Props) => {
  const onClick = () => {
    window.scrollTo(0, 200);
  };

  return (
    <Link onClick={onClick} to={`/catalogue/${projectData.id}`} className={classes['project-details']}>
      <div className={classes['project-details__content']}>
        <div className={classes['project-details__img']}>
          <img src={projectData.mainImage?.path} alt={projectData.id + ''} />
        </div>
        <div className={classes['project-details__info']}>
          {/*<span>{ projectData.title }</span>*/}
          <div className={classes['project-details__info-text']}>
            {projectData.title}
            <span>
              <br />
              проект
            </span>
          </div>

          <div className={classes['project-details__info-text']}>
            {/*TODO: livingArea or buildingArea??*/}
            {projectData.buildingArea} м<sup>2</sup>
            <span>
              <br />
              площадь
            </span>
          </div>

          <div className={classes['project-details__info-text']}>
            {projectData.projectPrice} грн.
            <span>
              <br />
              цена проекта
            </span>
          </div>
          <div className={classes['project-details__details-button']}>
            <Button title="Подробнее" buttonType={ButtonType.SMALL} />
          </div>
        </div>
      </div>
    </Link>
  );
});
