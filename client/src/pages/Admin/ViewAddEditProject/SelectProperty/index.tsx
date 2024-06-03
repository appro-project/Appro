import React from 'react'

import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

interface Props {
  title: string;
  value: string;
  options: ReadonlyArray<string>;
  required?: boolean;
  disabled?: boolean;

  handleProperty(event: SelectChangeEvent): void;
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
  <FormControl variant={'standard'} fullWidth required={required} disabled={disabled}>
    <InputLabel id={`${title}-label`}> {title}</InputLabel>
    <Select labelId={`${title}-label`} id={title} value={value} onChange={handleProperty}>
      {getSelectOptions(options)}
    </Select>
  </FormControl>
);

export default SelectProperty;
