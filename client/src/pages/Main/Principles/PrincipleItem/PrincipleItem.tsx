import classes from './PrincipleItem.module.scss'
import { PrincipleItemData } from '@/entity/PrincipleItemData'
import { useTranslation } from 'react-i18next';

interface Props {
  principleItem: PrincipleItemData;
}

export const PrincipleItem = ({ principleItem }: Props) => {
  const backgroundStyles = {
    backgroundImage: `url(${principleItem.backgroundUrl})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  };

  const {t} = useTranslation();

  return (
    <div className={classes.principle} style={backgroundStyles}>
      <div className={classes.principle__body}>
        <div className={classes.principle__title}>{t(principleItem.title)}</div>
        <div className={classes.principle__description}>{t(principleItem.description)}</div>
      </div>
    </div>
  );
};

