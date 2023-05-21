import { useEffect, useState } from 'react'
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs'
import { ProjectTabs } from './PropjectTabs/ProjectTabs'
import { useParams } from 'react-router'
import { Container } from '@/containers/hoc/Container/Container'
import { Project } from '@/entity/Project'

import classes from './Project.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '@/redux/selectors'
import { getProjectInLocalStorage, setProjectInLocalStorage } from '@/services/util/localStorage'
import { setViewProject } from '@/redux/actions'

type RouteProps = { projectId: string };

export const ProjectPage = () => {
  const [project, setProject] = useState<Project | null>(null);
  const { projectId } = useParams<RouteProps>();
  const projects = useSelector(getProjects);
  const dispatch = useDispatch();

  useEffect(() => {
    const findProject = projects.find((element) => element.id === +projectId);
    if (findProject) {
      setProject(findProject);
    }
  }, [projectId, projects]);

  useEffect(() => {
    const projectInLocalStorage: number[] = getProjectInLocalStorage();
    if (project) {
      const filterProjectInLocalStorage = projectInLocalStorage?.filter((elem) => elem !== project?.id);
      setProjectInLocalStorage([project?.id, ...filterProjectInLocalStorage]);
      dispatch(setViewProject(project));
    }
  }, [project]);

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
