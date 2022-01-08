import React from 'react';
import classes from './TextInput.module.scss';

interface Props {
  placeholder: string;
  // TODO: Replace with enum!
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  error?: boolean;
  label?: string;
}

const TextInputLine = ({ label, type, error, value, onChange, placeholder }: Props) => {
  return (
    <div className={classes['text-input']}>
      <label htmlFor={`${label}-${type}`}>
        {label}
        <input
          id={`${label}-${type}`}
          className={error ? classes['input__error'] : ''}
          value={value}
          onChange={onChange}
          type={type || 'text'}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default TextInputLine;
