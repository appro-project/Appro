import React from 'react';
import classes from './VisitedProjects.module.scss';
import Container from '../hoc/Container';

import Button, { ButtonType } from '../../components/UI/Button';
import { ProjectPreviewDetails } from '../../entity/ProjectData';
import projectsData from '../../mock/projectsData';

const VisitedProjects = () => {
  const data = [...projectsData];
  data.push(projectsData[0]);

  return <section>
    <Container>
      <h2 className={ classes['visited-projects__title'] }>
        Просмотренные проекты
      </h2>

      <div className={ classes['visited-projects__items'] }>
        { data.map(project => ProjectDetails(project)) }
      </div>
    </Container>
  </section>;
};

const ProjectDetails = (projectData: ProjectPreviewDetails) => {
  return <div className={ classes['project-details'] }>
    <div className={ classes['project-details__content'] }>
      <div className={ classes['project-details__img'] }>
        <img src={ projectData.image } alt={ projectData.title }/>
      </div>
      <div className={ classes['project-details__info'] }>
        { /*<span>{ projectData.title }</span>*/ }
        <div className={ classes['project-details__info-text'] }>
          1A-2
          <span><br/>проект</span>
        </div>

        <div className={ classes['project-details__info-text'] }>
          { projectData.square } м<sup>2</sup>
          <span><br/>площадь</span>
        </div>

        <div className={ classes['project-details__info-text'] }>
          { projectData.price } грн.
          <span><br/>цена проекта</span>
        </div>
        <div className={ classes['project-details__details-button'] }>
          <Button title="Подробнее" buttonType={ ButtonType.SMALL }/>
        </div>
      </div>
    </div>
  </div>;
};

export default VisitedProjects;
