import React from 'react';

import planImage from '../../../assets/img/individual/differences/plan.jpg';

import classes from './Difference.module.scss';

const Differences = () => {
  return (
    <div className={ classes ['differences'] }>
      <h2 className={ classes['differences__title'] }>
        Отличие индивидуального проекта от типового:
      </h2>

      <div className={ classes ['differences__image-wrapper'] } >
        <img src={ planImage } alt="plan image"/>
      </div>

      <p> - задание на проектирование составляется вместе с заказчиком, в котором определяется
        стадийность проектирования, состав помещений, этажность, общая площадь дома,
        архитектурный стиль, тип кровли и т.д.</p>

      <p> - правильное размещение дома на земельном участке с учетом противопожарных отступов</p>
      <p> - выбор материалов и конструктивной схемы и технологии строительства
        (технологические и экономические решения);</p>
      <p> - анализ функционального зонирования жилого дома (определяется оптимальный
        вариант будущей планировки дома);</p>
      <p> - обязательное авторское сопровождение проекта (авторский надзор)</p>
    </div>
  );
};

export default Differences;
