import React from 'react';
import TextProperty from '../TextProperty';

interface Props {
  title: string;
  value: number | null;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;

  onChange: (value: number | null) => void;
}

const NumericProperty = ({ title, value, required, disabled, onChange }: Props) => {
  const handleChange = (valueString: string) => {
    if (valueString.toString().length === 0 || valueString.match(/^\d+$/)) {
      const valueChecked = valueString.toString() === '' ? null : +valueString;
      onChange(Number(valueChecked) ? Number(valueChecked) : null);
    }
  };

  return (
    <TextProperty
      title={title}
      value={value ? value.toString() : ''}
      required={required}
      disabled={disabled}
      onChange={handleChange}
    />
  );
};

export default NumericProperty;
