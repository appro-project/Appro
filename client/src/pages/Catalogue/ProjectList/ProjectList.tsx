import classes from './ProjectList.module.scss'
import { Project } from '@/entity/Project'
import { ProjectDetails } from '@/containers/ProjectDetails/ProjectDetails'
import { memo } from 'react'
import {ProjectDto} from "@/api/model";

interface Props {
  projects: ProjectDto[];
}
export const ProjectList = memo(({ projects }: Props) => {
  return (
    <div className={classes['project-list__items']}>
      {projects.map((project: ProjectDto, idx: number) => (
        <ProjectDetails key={idx} projectData={project} />
      ))}
    </div>
  );
});

