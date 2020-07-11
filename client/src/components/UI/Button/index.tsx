import React from "react";
import classes from "./Button.module.scss";

export enum ButtonType {
    DEFAULT,
    TRANSPARENT = "transparent"
}

interface Props {
    title: string;

    actionHandler?(): void;

    buttonType?: ButtonType;
}

// TODO: What does it mean? (props: Props): {something} =>
const Button = (props: Props) => {
    const activeClasses = [classes["button"]];
    if (props.buttonType && props.buttonType === ButtonType.TRANSPARENT) {
        activeClasses.push(classes["button--transparent"]);
    }

    return <div className={activeClasses.join(" ")}>{props.title}</div>
}

export default Button;

