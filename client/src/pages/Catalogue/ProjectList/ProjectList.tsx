import classes from './ProjectList.module.scss'
import { Project } from '@/entity/Project'
import { ProjectDetails } from '@/containers/ProjectDetails/ProjectDetails'
import { memo } from 'react'

interface Props {
  projects: Project[];
}
export const ProjectList = memo(({ projects }: Props) => {
  return (
    <div className={classes['project-list__items']}>
      {projects.map((project: Project, idx: number) => (
        <ProjectDetails key={idx} projectData={project} />
      ))}
    </div>
  );
});

