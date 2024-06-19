import React from 'react'

import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import {TextField} from "@mui/material";

interface Props {
  title: string;
  value: string;
  options: ReadonlyArray<string>;
  required?: boolean;
  disabled?: boolean;

  handleProperty(event: React.ChangeEvent<any>): void;
}

const getSelectOptions = (options: ReadonlyArray<string>) => {
  const renderOptions = [] as JSX.Element[];
  options.forEach((option: string | number, idx: number) =>
    renderOptions.push(
      <MenuItem key={`${option}${idx}`} value={option}>
        {option}
      </MenuItem>,
    ),
  );

  return renderOptions;
};

const SelectProperty = ({ title, value, required, disabled, options, handleProperty }: Props) => (

    <TextField
        required={required} disabled={disabled}
        fullWidth
        variant={'outlined'} label={title} value={value}
               select
               onChange={handleProperty}>
      {getSelectOptions(options)}
    </TextField>
);

export default SelectProperty;
