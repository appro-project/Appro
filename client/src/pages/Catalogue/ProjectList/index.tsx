import React from 'react';
import classes from './ProjectList.module.scss';
import { ProjectPreviewDetails } from '../../../entity/ProjectPreviewDetails';
import ProjectDetails from '../../../containers/ProjectDetails';

interface Props {
    projects: ProjectPreviewDetails[];
}
const ProjectList = ({ projects }: Props) => {
    return <div className={ classes['project-list__items'] }>
        { projects.map((project: ProjectPreviewDetails, idx: number) =>
            <ProjectDetails key={ idx } projectData={ project }/>) }
    </div>;
};

export default ProjectList;
