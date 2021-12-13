import React from 'react';
import classes from './ProjectDetails.module.scss';
import { Project } from '../../entity/Project';
import Button, { ButtonType } from '../../components/UI/Button';
import { Link } from 'react-router-dom';

interface Props{
    projectData: Project;
}

const ProjectDetails = React.memo( ({ projectData }: Props) => {
    return <Link to={ `catalogue/${projectData.id}` } className={ classes['project-details'] }>
        <div className={ classes['project-details__content'] }>
            <div className={ classes['project-details__img'] }>
                <img src={ projectData.mainImage } alt={ projectData.id + ""}/>
            </div>
            <div className={ classes['project-details__info'] }>
                 { /*<span>{ projectData.title }</span>*/ }
                <div className={ classes['project-details__info-text'] }>
                    { projectData.id }
                    <span><br/>проект</span>
                </div>

                <div className={ classes['project-details__info-text'] }>
                    { /*TODO: livingArea or buildingArea??*/ }
                    { projectData.buildingArea } м<sup>2</sup>
                    <span><br/>площадь</span>
                </div>

                <div className={ classes['project-details__info-text'] }>
                    { projectData.projectPrice } грн.
                    <span><br/>цена проекта</span>
                </div>
                <div className={ classes['project-details__details-button'] }>
                    <Button title="Подробнее" buttonType={ ButtonType.SMALL }/>
                </div>
            </div>
        </div>
    </Link>;
});

export default ProjectDetails;
