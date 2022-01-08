import React from 'react';
import classes from './TextProperty.module.scss';

interface TextPropertyProps {
  title: string;
  value: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;

  onChange: (value: string) => void;
}

const TextProperty = ({ title, value, required, onChange, error, disabled }: TextPropertyProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={classes['text-input__wrapper']}>
      <label className={classes['text-input-label']} htmlFor={`${title}`}>
        {title}
        <input
          disabled={disabled}
          required={required}
          id={`${title}`}
          className={`${classes['text-input']} ${error ? classes['input__error'] : ''}`}
          value={value}
          onChange={handleChange}
          type={'text'}
        />
      </label>
    </div>
  );
};

export default TextProperty;
