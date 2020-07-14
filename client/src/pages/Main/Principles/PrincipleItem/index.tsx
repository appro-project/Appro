import React from "react";
import {PrincipleItemData} from "../index";

import classes from "./PrincipleItem.module.scss";

interface Props {
    principleItem: PrincipleItemData
}

const PrincipleItem = (prop: Props) => {
    const {principleItem} = prop;

    const backgroundStyles = {
        backgroundImage: "url("+principleItem.backgroundUrl+")",
        backgroundPosition: "center center",
        backgroundSize: "cover"
    }

    return <div className={classes["principle"]} style={backgroundStyles} >
        <div className={classes["principle__body"]}>
            <div className={classes["principle__title"]}>
                {principleItem.title}
            </div>
            <div className={classes["principle__description"]}>
                {principleItem.description}
            </div>
        </div>
    </div>;
}

export default PrincipleItem;