import React from 'react';

import classes from './IndividualProject.module.scss';
import Container from 'containers/hoc/Container';
import Differences from './Differences';

const IndividualProject = () => {
  return <React.Fragment>
    <Container>
      <div className={ classes['individual-project__header'] }>
        Индивидуальный проэкт
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


    </Container>
  </React.Fragment>;
};

export default IndividualProject;
