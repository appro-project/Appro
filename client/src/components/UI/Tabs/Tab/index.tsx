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

  const classNames = [classes.Tab];

  useEffect(() => {
    if (activeTab) {
      classNames.push(classes.Tab__Active);
    }
  }, [activeTab]);

  return (
    <li className={classNames.join(' ')} onClick={handleClick}>
      {label}
    </li>
  );
};

export default Tab;
