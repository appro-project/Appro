import React from 'react';
import { TextField } from '@material-ui/core';

interface Props {
  title: string;
  value: number | null;
  required?: boolean;
  disabled?: boolean;

  handleProperty(event: React.ChangeEvent<any>): void;
}

const NumericProperty = ({ title, value, required, disabled, handleProperty }: Props) => (
  <TextField
    variant="standard"
    required={required}
    fullWidth
    id="email"
    label={title}
    name={title}
    value={value || ''}
    type={'number'}
    disabled={disabled}
    onChange={(event) => handleProperty(event)}
  />
);

export default NumericProperty;
