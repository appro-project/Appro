import React from 'react';
import classes from './TextInput.module.scss';

interface Props {
  placeholder: string;
  // TODO: Replace with enum!
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  error?: boolean;
}

const TextInput = (props: Props) => {
  const type = props.type || 'text';

  return (
    <div className={classes['text-input']}>
      <input
        className={props.error ? classes['input__error'] : ''}
        value={props.value}
        onChange={props.onChange}
        type={type}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default TextInput;
