import React from 'react';

import classes from './Steps.module.scss';
import {StepInfo, steps} from "../../../constants/Steps";

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
