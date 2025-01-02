import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import {TextField} from "@mui/material";
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  label?: string
  value: string;
  options: ReadonlyArray<string>;
  required?: boolean;
  disabled?: boolean;

  handleProperty(event: React.ChangeEvent<any>): void;
}

const getSelectOptions = (options: ReadonlyArray<string>, label: string, t: any) => {
  const renderOptions = [] as JSX.Element[];
  options.forEach((option: string | number, idx: number) =>
    renderOptions.push(
      <MenuItem key={`${option}${idx}`} value={option}>
        {t(`options.${label}.${String(option).toLowerCase()}`)}
      </MenuItem>,
    ),
  );

  return renderOptions;
};

const SelectProperty = ({ title, value, required, disabled, options, label, handleProperty }: Props) => {
  const { t } = useTranslation();
  
  return (
    <TextField
        required={required} disabled={disabled}
        fullWidth
        variant={'outlined'} label={title} value={value}
               select
               onChange={handleProperty}>
      {getSelectOptions(options,label, t)}
    </TextField>
)};

export default SelectProperty;
