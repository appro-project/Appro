import React from 'react';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import classes from '../Catalogue/Catalogue.module.scss';
import ProjectTabs from './PropjectTabs';

const Project = () => {

    return <React.Fragment>
        <Breadcrumbs/>
        <div>
            <h1 className={ classes['catalogue__title'] }>
                проект 2а-1, 1-этажный, 2 спальни, гараж</h1>
            <div/>
        </div>
      <ProjectTabs/>
    </React.Fragment>;
};

export default Project;
