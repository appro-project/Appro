import React from 'react';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import ProjectTabs from './PropjectTabs';
import ImageCarousel from './ImageCarousel';
import { RouteComponentProps } from 'react-router';
import fullProjectsData from '../../mock/fullProjectsData';
import Container from '../../containers/hoc/Container';

import classes from './Project.module.scss';
import GeneralInfo from './GeneralInfo';

type RouteProps = { projectId: string };

const Project = ({ match }: RouteComponentProps<RouteProps>) => {
  const project = fullProjectsData.find(cp => cp.id === match.params.projectId);
  if (!project) {
    return <div>Not found</div>;
  }

  return <section className={ classes.Project }>
    <Container>
      <div className={ classes.Project_Breadcrumbs }>
        <Breadcrumbs/>
      </div>
      <h1 className={ classes.Project_Title }>
        { project.title }
      </h1>
      <div className={ classes.Project_Body }>
        <ProjectTabs/>
        <GeneralInfo title={ project.title }
                     generalArea={project.generalArea}
                     projectPrice = {project.projectPrice}
                     timeToCreate = {project.timeToCreate}
                     images = {project.images}
        />
      </div>
    </Container>
  </section>;
};

export default Project;
