import React from 'react';
import classes from './Button.module.scss';

export enum ButtonType {
  DEFAULT,
  TRANSPARENT = 'transparent',
  BIG = 'big',
  SMALL = 'small',
  TRANSPARENT_SMALL = 'transparent_small',
  EXTENDED = 'extended',
}

interface Props {
  title: string;

  buttonType?: ButtonType;

  actionHandler?(): void;
}

// TODO: What does it mean? (props: Props): {something} =>
const Button = (props: Props) => {
  const activeClasses = [classes['button']];
  if (props.buttonType && props.buttonType === ButtonType.EXTENDED) {
    activeClasses.push(classes['button--extended']);
  }

  if (props.buttonType && props.buttonType === ButtonType.TRANSPARENT) {
    activeClasses.push(classes['button--transparent']);
  }

  if (props.buttonType && props.buttonType === ButtonType.TRANSPARENT_SMALL) {
    activeClasses.push(classes['button--transparent-small']);
  }

  if (props.buttonType && props.buttonType === ButtonType.BIG) {
    activeClasses.push(classes['button--big']);
  }

  if (props.buttonType && props.buttonType === ButtonType.SMALL) {
    activeClasses.push(classes['button--small']);
  }

  return (
    <button className={activeClasses.join(' ')} onClick={props.actionHandler}>
      {props.title}
    </button>
  );
};

export default Button;
