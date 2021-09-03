import React from 'react';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import ProjectTabs from './PropjectTabs';
import ImageCarousel from './ImageCarousel';
import { RouteComponentProps } from 'react-router';
import fullProjectsData from '../../mock/fullProjectsData';
type RouteProps = {projectId: string};

const Project = ({ match }: RouteComponentProps<RouteProps>) => {
    const project = fullProjectsData.find(cp => cp.id === match.params.projectId);
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

export default Project;
