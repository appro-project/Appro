import React from 'react';

import classes from './IndividualProject.module.scss';
import Container from 'containers/hoc/Container';
import Differences from './Differences';
import Steps from './Steps';
import Order from './Order';
import VisitedProjects from '../../containers/VisitedProjects';
import Breadcrumbs from '../../components/UI/Breadcrumbs';

const IndividualProject = () => {
  return <div className={ classes.IndividualProject }>
    <Container>
      <div className={ classes.IndividualProject_Breadcrumbs }>
        <Breadcrumbs/>
      </div>
      <div className={ classes['individual-project__header'] }>
        Индивидуальный проект
      </div>
      <p className={ classes['individual-project__description'] }>
        Проект жилого дома с индивидуальными требованиями заказчика – комплексный подход
        специалистов (архитекторов, инженеров) к проектированию
        объекта, согласно задания на проектирование.</p>

      <div className={ classes['individual-project__differences-wrapper'] }>
        <Differences/>
      </div>

      <p className={ classes['individual-project__description'] }>
        Так как мы проектируем, а наши компаньоны строят,
        нам известны определенные тонкости строительства.
      </p>
      <p className={ classes['individual-project__description'] }>
        Для того чтобы Ваши задуманные идеи
        воплотились в жизнь, мы просчитаем несколько экономически целесообразных вариантов и выберем
        наиболее выгодный.
      </p>
      <p className={ classes['individual-project__description'] }>Точно просчитанные объемы, которые
        входят в состав проекта, помогут нам точно определить сметную стоимость строительства.
      </p>

      <div className={ classes['individual-project__steps-wrapper'] }>
        <Steps/>
      </div>

      <div className={ classes['individual-project__order-wrapper'] }>
        <Order/>
      </div>
    </Container>
    { /* Kind of page Footer, should be out of container */ }
    <div className={ classes['individual-project__visited-wrapper'] }>
      <VisitedProjects/>
    </div>
  </div>;
};

export default IndividualProject;
