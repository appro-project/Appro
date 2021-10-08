import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import ProjectTabs from './PropjectTabs';
import { RouteComponentProps } from 'react-router';
import Container from '../../containers/hoc/Container';
import { getProjectById } from '../Admin/service';
import { Project } from '../../entity/Project';

import classes from './Project.module.scss';
import GeneralInfo from './GeneralInfo';

type RouteProps = { projectId: string };

const ProjectPage = ({ match }: RouteComponentProps<RouteProps>) => {
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        getProjectById(Number(match.params.projectId))
            .then((res) => {
                console.log(res);
                setProject(res);
            });
    });

     if (!project) {
         return <div>Not found</div>;
     }

  console.log(project);

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
                     generalArea={ project.generalArea }
                     projectPrice = { project.projectPrice }
                     timeToCreate = { project.timeToCreate }
                     images = { project.images }
        />
      </div>
    </Container>
  </section>;
};

export default ProjectPage;
