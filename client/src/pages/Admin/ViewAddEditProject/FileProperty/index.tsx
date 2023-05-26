import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import { FormLabel } from '@mui/material'

interface Props {
  title: string;
  required?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  handleProperty(event: React.ChangeEvent<any>): void;
}

const FileProperty = ({ title, required, multiple, disabled, handleProperty }: Props) => (
  <React.Fragment>
    <FormLabel>{title}</FormLabel>
    <FormControl>
      <InputLabel htmlFor={`${title}-label`} />
      <Input
        type="file"
        id={`${title}-label`}
        onChange={(event) => handleProperty(event)}
        inputProps={{ multiple }}
        disabled={disabled}
        required={required}
      />
    </FormControl>
  </React.Fragment>
);

export default FileProperty;
