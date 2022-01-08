import React from 'react';
import classes from './SelectProperty.module.scss';

interface Props {
  title: string;
  value: string;
  options: string[];
  required?: boolean;
  handleProperty: (value: string) => void;
}

const SelectProperty = ({ title, value, required, options, handleProperty }: Props) => (
  <div className={classes['select-group']}>
    <label className={classes['select-label']} htmlFor="select">
      {title}
    </label>
    <select
      id={'select'}
      required={required}
      value={value}
      onChange={(e) => handleProperty(e.target.value)}
      className={classes['form-control']}
    >
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectProperty;
