import React from 'react';
import classes from './PrincipleItem.module.scss';
import { PrincipleItemData } from '../../../../entity/PrincipleItemData';

interface Props {
  principleItem: PrincipleItemData;
}

const PrincipleItem = ({ principleItem }: Props) => {
  const backgroundStyles = {
    backgroundImage: `url(${principleItem.backgroundUrl})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  };

  return (
    <div className={classes.principle} style={backgroundStyles}>
      <div className={classes.principle__body}>
        <div className={classes.principle__title}>{principleItem.title}</div>
        <div className={classes.principle__description}>{principleItem.description}</div>
      </div>
    </div>
  );
};

export default PrincipleItem;
