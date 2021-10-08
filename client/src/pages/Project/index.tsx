import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import ProjectTabs from './PropjectTabs';
import ImageCarousel from './ImageCarousel';
import { RouteComponentProps } from 'react-router';
import { getProjectById } from '../Admin/service';
import { Project } from '../../entity/Project';
type RouteProps = {projectId: string};

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

    return <React.Fragment>
        <Breadcrumbs/>
        <div>
            <h1>
                { project.title }</h1>
            <div/>
        </div>
      <ProjectTabs/>
      <ImageCarousel images = { project.images }/>
    </React.Fragment>;
};

export default ProjectPage;
