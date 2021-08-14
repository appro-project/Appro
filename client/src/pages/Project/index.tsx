import React from 'react';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import classes from '../Catalogue/Catalogue.module.scss';
import ProjectTabs from './PropjectTabs';
import ImageCarousel from './ImageCarousel';
import { RouteComponentProps } from 'react-router';
import catalogueProjects from '../../mock/catalogueProjectsData';
type RouteProps = {projectId: string};

const Project = ({ match }: RouteComponentProps<RouteProps>) => {
    const project = catalogueProjects.find(cp => cp.id === match.params.projectId);
     if (!project) {
         return <div>Not found</div>;
     }

    return <React.Fragment>
        <Breadcrumbs/>
        <div>
            <h1 className={ classes['catalogue__title'] }>
                { project.title }</h1>
            <div/>
        </div>
      <ProjectTabs/>
      <ImageCarousel/>
    </React.Fragment>;
};

export default Project;
