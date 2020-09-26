import React from 'react';

import classes from './TextArea.module.scss';

interface Props {
  placeholder: string;
}

const TextArea = (props: Props) => {

  return <div className={ classes['text-area'] }>
    <textarea placeholder={ props.placeholder }/>
  </div>;
};

export default TextArea;
