import React, { useEffect } from 'react';
import classes from './Tab.module.scss';
import { IProjectTubsName } from '../../../../pages/Project/interfaces';

interface Props {
  label: IProjectTubsName;
  activeTab: boolean;

  onClick(label: IProjectTubsName): void;
}

const Tab = ({ label, onClick, activeTab }: Props) => {
  const handleClick = () => {
    onClick(label);
  };

  return (
    <li className={`${classes.Tab} ${activeTab ? classes.Tab__Active : ''}`} onClick={handleClick}>
      {label}
    </li>
  );
};

export default Tab;
