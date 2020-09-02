import React from 'react';
import classes from './Button.module.scss';

export enum ButtonType {
    DEFAULT,
    TRANSPARENT = 'transparent',
    BIG = 'big',
}

interface Props {
    title: string;

    buttonType?: ButtonType;

    actionHandler?(): void;
}

// TODO: What does it mean? (props: Props): {something} =>
const Button = (props: Props) => {
    const activeClasses = [classes['button']];
    if (props.buttonType && props.buttonType === ButtonType.TRANSPARENT) {
        activeClasses.push(classes['button--transparent']);
    }

    if (props.buttonType && props.buttonType === ButtonType.BIG) {
        activeClasses.push(classes['button--big']);
    }

    return <div className={ activeClasses.join(' ') }>{ props.title }</div>;
};

export default Button;
