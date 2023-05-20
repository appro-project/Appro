import React from 'react';
import classes from './TextInput.module.scss';
import InputMask from 'react-input-mask';

interface Props {
  placeholder: string;
  // TODO: Replace with enum!
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  error?: boolean;
  label?: string;
  mask?: string;
}

const TextInput = ({ label, type, error, value, onChange, placeholder, mask }: Props) => {
  return (
    <div className={classes['text-input']}>
      {!mask && (
        <input
          className={error ? classes['input__error'] : ''}
          value={value}
          onChange={onChange}
          type={type || 'text'}
          placeholder={placeholder}
        />
      )}
      {mask && (
        <InputMask mask={mask} onChange={onChange} value={value}>
          <input
            className={error ? classes['input__error'] : ''}
            // value={value}
            // onChange={onChange}
            type={type || 'text'}
            placeholder={placeholder}
          />
        </InputMask>
      )}
    </div>
  );
};

export default TextInput;
