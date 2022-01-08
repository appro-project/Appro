import React, { useState } from 'react';
import classes from './Welcome.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel-custom.scss';
import { Carousel } from 'react-responsive-carousel';
import { Project } from '../../../entity/Project';
import ProjectItem from './ProjectItem';
import { ReactComponent as SliderPrev } from '../../../assets/img/main/welcome/slider-prev.svg';
import { ReactComponent as SliderNext } from '../../../assets/img/main/welcome/slider-next.svg';
import { HashLink as Link } from 'react-router-hash-link';

interface PropsType {
  mockProjects: Project[];
}

const Welcome = ({ mockProjects }: PropsType) => {
  const renderArrowPrev = (clickHandler: () => void) => {
    const arrowClasses = ['slider-control__prev', 'control-arrow'];

    return (
      <button onClick={clickHandler} aria-label="prev slide / item" className={arrowClasses.join(' ')}>
        <SliderPrev />
      </button>
    );
  };

  const renderArrowNext = (clickHandler: () => void) => {
    const arrowClasses = ['slider-control__next', 'control-arrow'];

    return (
      <button onClick={clickHandler} aria-label="next slide / item" className={arrowClasses.join(' ')}>
        <SliderNext />
      </button>
    );
  };

  return (
    <section className={classes.welcome}>
      <Carousel renderArrowNext={renderArrowNext} renderArrowPrev={renderArrowPrev} infiniteLoop interval={4000}>
        {mockProjects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
      </Carousel>
      <Link to="/#popular-category">
        <div aria-label="to bottom" className={['slider-control__bottom', 'control-arrow'].join(' ')}>
          <SliderNext />
        </div>
      </Link>
    </section>
  );
};

export default Welcome;
