import React from "react";
import {PopularCategoryData} from "../index";
import classes from "./PopularCategory.module.scss";
import Overlay from "../../../../components/UI/Overlay";

interface Props {
    categoryData: PopularCategoryData;
}

const PopularCategory = (props: Props) => {
    const {categoryData} = props;

    return <div className={classes["popular-category"]}>
        <div className={classes["popular-category__body"]}>
            <div className={classes["popular-category__img-wrapper"]}>
                {/*TODO: Add alt! */}
                <img src={categoryData.image} alt=""/>
                <Overlay/>
            </div>
            <div className={classes["popular-category__title"]}>
                {categoryData.title}
            </div>
        </div>
    </div>
}

export default PopularCategory;