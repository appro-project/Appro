import React from 'react'
import Switch from 'react-switch'
import classes from './CheckProperty.module.scss'

interface Props {
  title: string;
  checked: boolean;
  disabled?: boolean;

  handleProperty(): void;
}

const CheckProperty = ({ title, checked, disabled, handleProperty }: Props) => (
  <div className={classes['check-box']}>
    <p className={classes['label']}>{title}</p>
    <Switch
      checked={checked}
      onChange={() => handleProperty()}
      onColor={'#FFCF42'}
      offColor={'#3C3C3C'}
      name="project-garage"
      disabled={disabled}
      handleDiameter={20}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      height={15}
      width={38}
      // style={{ marginBottom: '20px' }}
    />
  </div>
);
export default CheckProperty;
