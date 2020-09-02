import React from 'react';

import classes from './TextInput.module.scss';

interface Props {
  placeholder: string;
}

const TextInput = (props: Props) => {
  return <div className={ classes['text-input'] }>
    <input type="text" placeholder={ props.placeholder }/>
  </div>;
};

export default TextInput;
