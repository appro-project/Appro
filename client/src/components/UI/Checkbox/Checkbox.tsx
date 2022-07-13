import React from 'react';
import './checkbox.module.scss';

interface CheckboxProps {
  checked: boolean;
  labelName: string;
  id?: string;
  htmlFor?: string;
  onClick?: () => void;
}

const Checkbox = ({ id, checked, onClick, htmlFor, labelName }: CheckboxProps) => {
  return (
    <>
      <input type="checkbox" id={id} checked={checked} />
      <label onClick={onClick} htmlFor={htmlFor}>
        {labelName}
      </label>
    </>
  );
};

export default Checkbox;
