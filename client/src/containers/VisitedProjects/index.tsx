import React from 'react';
import classes from './VisitedProjects.module.scss';
import Container from '../hoc/Container';

import { ProjectPreviewDetails } from '../../entity/ProjectData';
import projectsData from '../../mock/projectsData';
import ProjectDetails from '../ProjectDetails';

const VisitedProjects = () => {
  const data = [ ...projectsData ];
  data.push(projectsData[0]);

  return <section>
    <Container>
      <h2 className={ classes['visited-projects__title'] }>
        Просмотренные проекты
      </h2>

      <div className={ classes['visited-projects__items'] }>
        { data.map((project: ProjectPreviewDetails, idx: number) =>
                     (<div className={ classes.VisitedProjects_ProjectWrapper } key={ idx }>
                       <ProjectDetails projectData={ project }/>
                     </div>)) }
      </div>
    </Container>
  </section>;
};

export default VisitedProjects;
