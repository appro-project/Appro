import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import classes from './GeneralInfo.module.scss';
import Button, { ButtonType } from '../../../components/UI/Button';

enum TypeOfHouse {
  Original = 'Original',
  Mirrored = 'Mirrored',
}

export interface InfoCardProps {
  title: string;
  generalArea: number;
  timeToCreate: number;
  projectPrice: number;
}

const InfoCard = (props: InfoCardProps) => {
  const [type, setType] = useState<TypeOfHouse>(TypeOfHouse.Mirrored);

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  return (
    <div className={classes.GeneralInfo_Body}>
      <form>
        <h2 className={classes.GeneralInfo_Title}>{props.title}</h2>
        <div className={classes.GeneralInfo_Types}>
          <div className={classes.GeneralInfo_Type}>
            <input
              type="radio"
              name="typeOfHouse"
              value={TypeOfHouse.Original}
              onChange={handleChangeType}
              checked={type === TypeOfHouse.Original}
              id={'original'}
            />
            <label htmlFor="original">Оригинальный</label>
          </div>

          <div className={classes.GeneralInfo_Type}>
            <input
              type="radio"
              name="typeOfHouse"
              value={TypeOfHouse.Mirrored}
              id={'mirrored'}
              onChange={handleChangeType}
              checked={type === TypeOfHouse.Mirrored}
            />
            <label htmlFor="mirrored">Зеркальный</label>
          </div>
        </div>

        <div className={classes.GeneralInfo_InfoRows}>
          <div className={classes.GeneralInfo_InfoRow}>
            <div className={classes.GeneralInfo_InfoKey}>общая площадь</div>
            <div className={classes.GeneralInfo_InfoValue}>
              {props.generalArea} м<sup>2</sup>
            </div>
          </div>

          <div className={classes.GeneralInfo_InfoRow}>
            <div className={classes.GeneralInfo_InfoKey}>подготовка проекта</div>
            <div className={classes.GeneralInfo_InfoValue}>{props.timeToCreate} дней</div>
          </div>

          <div className={classes.GeneralInfo_InfoRow}>
            <div className={classes.GeneralInfo_InfoKey}>цена проекта</div>
            <div className={classes.GeneralInfo_InfoValue}>
              <NumberFormat value={props.projectPrice} displayType={'text'} thousandSeparator={' '} suffix={' грн'} />
            </div>
          </div>
        </div>

        <div className={classes.GeneralInfo_Button}>
          <Button title={'Заказать'} buttonType={ButtonType.EXTENDED} />
        </div>
      </form>
    </div>
  );
};

export default InfoCard;
