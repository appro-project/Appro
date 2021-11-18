import React from 'react';
import classes from './VisitedProjects.module.scss';
import Container from '../hoc/Container';

import { Project } from '../../entity/Project';
import mockProjects from '../../mock/projects';
import ProjectDetails from '../ProjectDetails';

const VisitedProjects = () => {
  const data = [...mockProjects];
  data.push(mockProjects[0]);
  data.push(mockProjects[0]);

  return <section>
    <Container>
      <h2 className={ classes['visited-projects__title'] }>
        Просмотренные проекты
      </h2>

      <div className={ classes['visited-projects__items'] }>
        { data.map((project: Project, idx: number) =>
                     (<div className={ classes.VisitedProjects_ProjectWrapper } key={ idx }>
                       <ProjectDetails projectData={ project }/>
                     </div>)) }
      </div>
    </Container>
  </section>;
};

export default VisitedProjects;
