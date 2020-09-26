import React from 'react';

import classes from './TextInput.module.scss';

interface Props {
  placeholder: string;
  // TODO: Replace with enum!
  type?: string;
}

const TextInput = (props: Props) => {
  const type = props.type || 'text';

  return <div className={ classes['text-input'] }>
    <input type={ type } placeholder={ props.placeholder }/>
  </div>;
};

export default TextInput;
