import React from 'react';
// import classes from './TextProperty.module.scss';
import { TextField } from '@material-ui/core';

interface Props {
  title: string;
  value: string;
  required?: boolean;

  handleProperty(event: React.ChangeEvent<any>): void;
}

const TextProperty = ({ title, value, required, handleProperty }: Props) => (
  <TextField
    variant="standard"
    required={required}
    fullWidth
    id="email"
    label={title}
    name={title}
    value={value}
    onChange={(event) => handleProperty(event)}
  />
);

export default TextProperty;
