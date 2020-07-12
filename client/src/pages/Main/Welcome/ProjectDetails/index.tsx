import React from "react";
import {ProjectDetailsData} from "../index";
import Button from "../../../../components/UI/Button";

import classes from "./ProjectDetails.module.scss";

interface Props {
    project: ProjectDetailsData;
}

const ProjectDetails = (props: Props) => {
    const projectData: ProjectDetailsData = props.project;
    return <div className={classes["project-details"]}>
        <div className={classes["project-details__header"]}>
            <div className={classes["project-details__title"]}>
                {projectData.title}
            </div>

            <div className={classes["project-details__square"]}>
                {projectData.square} м<sup>2</sup>
            </div>
        </div>
        <div className={classes["project-details__description"]}>
            {projectData.description}
        </div>

        <div className={classes["project-details__footer"]}>
            <div className={classes["project-details__price"]}>
                {projectData.price} грн.
                <span className={classes["project-details__price-info"]}>цена проекта</span>
            </div>
            <a href="#" className={classes["project-details__link"]}>
                <Button title={"Подробнее"}/>
            </a>
        </div>
    </div>

}

export default ProjectDetails;

//
