import React from 'react';
// import classes from './TextProperty.module.scss';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface Props {
  title: string;
  value: string;
  options: string[];
  required?: boolean;
  handleProperty(event: React.ChangeEvent<any>): void;
}

const getSelectOptions = (options: string[]) => {
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

const SelectProperty = ({ title, value, required, options, handleProperty }: Props) => (
  <FormControl variant={'standard'} fullWidth required={required}>
    <InputLabel id={`${title}-label`}> {title}</InputLabel>
    <Select labelId={`${title}-label`} id={title} value={value} onChange={(event) => handleProperty(event)}>
      {getSelectOptions(options)}
    </Select>
  </FormControl>
);

export default SelectProperty;
