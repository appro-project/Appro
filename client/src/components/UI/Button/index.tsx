import React from 'react';
import classes from './Button.module.scss';

export enum ButtonType {
  DEFAULT,
  TRANSPARENT = 'transparent',
  BIG = 'big',
  SMALL = 'small',
  TRANSPARENT_SMALL = 'transparent_small',
  EXTENDED_TRANSPARENT = 'extended_transparent',
  EXTENDED = 'extended',
}

interface Props {
  title: string;

  buttonType?: ButtonType;
  disabled?: boolean;
  isButton?: boolean;
  color?: string;
  width?: string;

  actionHandler?(): void;
}

// TODO: What does it mean? (props: Props): {something} =>
const Button = (props: Props) => {
  const activeClasses = [classes['button']];
  if (props.buttonType && props.buttonType === ButtonType.EXTENDED) {
    activeClasses.push(classes['button--extended']);
  }

  if (props.buttonType && props.buttonType === ButtonType.EXTENDED_TRANSPARENT) {
    activeClasses.push(classes['button--extended--transparent']);
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
    <button
      type={props.isButton ? 'button' : 'submit'}
      disabled={props.disabled}
      className={activeClasses.join(' ')}
      onClick={props.actionHandler}
      style={{ color: props.color, width: props.width }}
    >
      {props.title}
    </button>
  );
};

export default Button;
