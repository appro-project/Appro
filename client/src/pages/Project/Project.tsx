import { Breadcrumbs } from '@/components/UI/Breadcrumbs/Breadcrumbs'
import { Container } from '@/containers/hoc/Container/Container'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { ProjectTabs } from './PropjectTabs/ProjectTabs'

import { useGetProjectById } from '@/api/useGetProjectById'
import { setViewProject } from '@/redux/actions'
import { getProjectInLocalStorage, setProjectInLocalStorage } from '@/services/util/localStorage'
import { useDispatch } from 'react-redux'
import classes from './Project.module.scss'

type RouteProps = { projectId: string };

export const ProjectPage = () => {
  const { projectId } = useParams<RouteProps>();
  const {data:project} = useGetProjectById(+projectId);
  const dispatch = useDispatch();

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
          <Breadcrumbs title={project.title} />
        </div>
        <h1 className={classes.Project_Title}>{project.title}</h1>
        <div className={classes.Project_Body}>{project && <ProjectTabs project={project} />}</div>
      </Container>
    </section>
  );
};
