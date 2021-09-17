import React from 'react';
import classes from './GeneralInfo.module.scss';
import ImageCarousel from '../ImageCarousel';
import Button, { ButtonType } from '../../../components/UI/Button';

interface Props {
  title: string;
  generalArea: number;
  timeToCreate: string;
  projectPrice: number;
  images: string[];
}

const GeneralInfo = (props: Props) => {
  return <section>
    <div className={ classes.GeneralInfo_Wrapper }>
      <div className={ classes.GeneralInfo_Images }>
        <ImageCarousel images={ props.images }/>
      </div>
      <div className={ classes.GeneralInfo_Body }>
        <form>
          <h2 className={ classes.GeneralInfo_Title }>{ props.title }</h2>
          <div className={ classes.GeneralInfo_Types }>
            <div className={ classes.GeneralInfo_Type }>
              <input type="radio" name="original" checked/>
              <label htmlFor="original">Оригинальный</label>
            </div>

            <div className={ classes.GeneralInfo_Type }>
              <input type="radio" name="original"/>
              <label htmlFor="original">Зеркальный</label>
            </div>
          </div>

          <div className={ classes.GeneralInfo_InfoRows }>
            <div className={ classes.GeneralInfo_InfoRow }>
              <div className={ classes.GeneralInfo_InfoKey }>
                общая площадь
              </div>
              <div className={ classes.GeneralInfo_InfoValue }>
                { props.generalArea } м<sup>2</sup>
              </div>
            </div>

            <div className={ classes.GeneralInfo_InfoRow }>
              <div className={ classes.GeneralInfo_InfoKey }>
                подготовка проекта
              </div>
              <div className={ classes.GeneralInfo_InfoValue }>
                { props.timeToCreate }
              </div>
            </div>

            <div className={ classes.GeneralInfo_InfoRow }>
              <div className={ classes.GeneralInfo_InfoKey }>
                цена проекта
              </div>
              <div className={ classes.GeneralInfo_InfoValue }>
                { props.projectPrice }
              </div>
            </div>
          </div>

          <div className={ classes.GeneralInfo_Button }>
            <Button title={ 'Заказать' } buttonType={ButtonType.EXTENDED}/>
          </div>
        </form>
      </div>
    </div>
  </section>;
};

export default GeneralInfo;
