import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import {Box, FormLabel} from '@mui/material'

interface Props {
  title: string;
  required?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  handleProperty(event: React.ChangeEvent<any>): void;
}

const FileProperty = ({ title, required, multiple, disabled, handleProperty }: Props) => (
  <Box sx={{my:4}}>
    <FormLabel></FormLabel>
    <FormControl >
        {/*<InputLabel htmlFor={`${title}-label`} >{title}</InputLabel>*/}
      <Input
        type="file"
        title={title}
        id={`${title}-label`}
        onChange={(event) => handleProperty(event)}
        inputProps={{ multiple }}
        disabled={disabled}
        required={required}
      />
    </FormControl>
  </Box>
);

export default FileProperty;
