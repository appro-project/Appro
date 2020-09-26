import React from 'react';

import classes from './Steps.module.scss';

interface StepInfo {
  title: string;
  description: string;
}

const steps: StepInfo[] = [
  {
    title: 'Предпроектное предложение',
    description: 'этап для определения планировки дома и основных технико-экономических ' +
      'показателей, его внешнего вида,размещения на участке',
  },
  {
    title: 'Проект',
    description: 'утверждаемая часть рабочего проекта или',
  },
  {
    title: 'Рабочая документация',
    description: 'комплект документов для производства строительных и' +
      'монтажных работ',
  },
  {
    title: 'Дизайн проект интерьера',
    description: 'обязательная стадия для комплексного подхода в' +
      'проектировании жилого дома',
  },
];

const Steps = () => {
  return (
    <div className={ classes ['steps'] }>
      <h3 className={ classes ['steps__title'] }>Основные этапы проектирования</h3>
      <div className={ classes ['steps__step-items'] }>
        { steps.map((s, index) => createStep(s, index + 1)) }
      </div>
    </div>
  );
};

const createStep = (step: StepInfo, stepNumber: number) => {
  return <div className={ classes ['steps__step-item'] }>
    <div className={ classes ['steps__step-number'] }>{ stepNumber }</div>
    <div className={ classes ['steps__step-title'] }>{ step.title }</div>
    <div className={ classes ['steps__step-description'] }>{ step.description }</div>
  </div>;
};

export default Steps;
