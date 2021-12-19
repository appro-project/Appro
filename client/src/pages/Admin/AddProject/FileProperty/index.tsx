import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { FormLabel } from '@material-ui/core';
import classes from './FileProperty.module.scss';

interface Props {
  title: string;
  required?: boolean;
  multiple?: boolean;

  handleProperty(event: React.ChangeEvent<HTMLInputElement>): void;
}

const FileProperty = ({ title, required, multiple, handleProperty }: Props) => (
  <React.Fragment>
    <FormLabel>{title}</FormLabel>
    <FormControl>
      <label className={classes['file-label']} htmlFor={`${title}-label`}>
        <input hidden type="file" onChange={(event) => handleProperty(event)} required={required} />
      </label>
      {/*<Input disabled inputProps={{ multiple }} />*/}
    </FormControl>
  </React.Fragment>
);

export default FileProperty;
