import React from 'react';
import { InputLabel, Switch } from '@material-ui/core';

interface Props {
  title: string;
  checked: boolean;
  disabled?: boolean;

  handleProperty(): void;
}

const CheckProperty = ({ title, checked, disabled, handleProperty }: Props) => (
  <React.Fragment>
    <InputLabel>{title}</InputLabel>
    <Switch
      checked={checked}
      onChange={() => handleProperty()}
      color="primary"
      name="project-garage"
      disabled={disabled}
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  </React.Fragment>
);
export default CheckProperty;
