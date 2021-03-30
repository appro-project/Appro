import React from 'react';
import classes from './ProjectDetails.module.scss';
import { ProjectPreviewDetails } from '../../entity/ProjectData';
import Button, { ButtonType } from '../../components/UI/Button';

interface Props{
    projectData: ProjectPreviewDetails;
}

const ProjectDetails = ({ projectData }: Props) => {
    return <div className={ classes['project-details'] }>
        <div className={ classes['project-details__content'] }>
            <div className={ classes['project-details__img'] }>
                <img src={ projectData.image } alt={ projectData.title }/>
            </div>
            <div className={ classes['project-details__info'] }>
                { /*<span>{ projectData.title }</span>*/ }
                <div className={ classes['project-details__info-text'] }>
                    1A-2
                    <span><br/>проект</span>
                </div>

                <div className={ classes['project-details__info-text'] }>
                    { projectData.square } м<sup>2</sup>
                    <span><br/>площадь</span>
                </div>

                <div className={ classes['project-details__info-text'] }>
                    { projectData.price } грн.
                    <span><br/>цена проекта</span>
                </div>
                <div className={ classes['project-details__details-button'] }>
                    <Button title="Подробнее" buttonType={ ButtonType.SMALL }/>
                </div>
            </div>
        </div>
    </div>;
};

export default ProjectDetails;
