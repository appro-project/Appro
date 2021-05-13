import React from 'react';

import Button from '../../../../components/UI/Button';

import classes from './ProjectDetails.module.scss';
import { ProjectPreviewDetails } from '../../../../entity/ProjectData';

interface Props {
    project: ProjectPreviewDetails;
}

interface Props {
    project: ProjectPreviewDetails;
}

const ProjectDetails = (props: Props) => {
    const projectData: ProjectPreviewDetails = props.project;

    return <div className={ classes['project-details'] }>
        <div className={ classes['project-details__header'] }>
            <div className={ classes['project-details__title'] }>
               Проект { projectData.title }
            </div>

            { /*TODO: Fix square*/ }
            <div className={ classes['project-details__square'] }>
                { projectData.area } м<sup>2</sup>
            </div>
        </div>
        <div className={ classes['project-details__description'] }>
            { projectData.description }
        </div>

        <div className={ classes['project-details__footer'] }>
            <div className={ classes['project-details__price'] }>
                { projectData.price } грн.
                <span className={ classes['project-details__price-info'] }>цена проекта</span>
            </div>
            <a href="#" className={ classes['project-details__link'] }>
                <Button title={ 'Подробнее' }/>
            </a>
        </div>
    </div>;

};

export default ProjectDetails;
