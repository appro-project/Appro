import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import ProjectTabs from './PropjectTabs';
import { RouteComponentProps, useParams } from 'react-router';
import Container from '../../containers/hoc/Container';
import { Project } from '../../entity/Project';

import classes from './Project.module.scss';
import GeneralInfo from './GeneralInfo';
import ProjectLayout from './ProjectLayout';
import ProjectStructure from './ProjectStructure';
import Changes from './Changes';
import Additional from './Additional';
import Gallery from './Gallery';
import VisitedProjects from '../../containers/VisitedProjects';
import { axiosGetProjectById } from '../../services/server-data';
import { useSelector } from 'react-redux';
import { getProjects } from '../../redux/selectors';

type RouteProps = { projectId: string };

const ProjectPage = () => {
  const [project, setProject] = useState<Project | null>(null);
  const { projectId } = useParams<RouteProps>();
  const projects = useSelector(getProjects);

  useEffect(() => {
    const findProject = projects.find((element) => element.id === +projectId);
    if (findProject) {
      setProject(findProject);
    }
  }, [projectId]);

  if (!project) {
    return <div>Not found</div>;
  }

  return (
    <section className={classes.Project}>
      <Container>
        <div className={classes.Project_Breadcrumbs}>
          <Breadcrumbs />
        </div>
        <h1 className={classes.Project_Title}>{project.title}</h1>
        <div className={classes.Project_Body}>{project && <ProjectTabs project={project} />}</div>
      </Container>
    </section>
  );
};

export default ProjectPage;
