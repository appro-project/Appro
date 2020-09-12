import React from 'react';

import classes from './Welcome.module.scss';
import { ReactComponent as SliderPrev } from 'assets/img/main/welcome/slider-prev.svg';
import { ReactComponent as SliderNext } from 'assets/img/main/welcome/slider-next.svg';

import ProjectDetails from './ProjectDetails';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel-custom.scss';
import { Carousel } from 'react-responsive-carousel';
import Overlay from '../../../components/UI/Overlay';

import projectsData from './projectsData';

const sliderProps = () => ({
    renderArrowPrev,
    renderArrowNext,
    showThumbs: false,
    showStatus: false,
    infiniteLoop: true,
    autoPlay: false,
    interval: 4000,
});

// TODO: Maybe I should create folder entities?
export interface ProjectDetailsData {
    image?: string;
    title: string;
    square: number;
    description: string;
    price: string;
    detailsUrl: string;
}

const renderArrowPrev = (clickHandler: () => void, hasPrev: boolean, label: string) => {
    const arrowClasses = ['slider-control__prev', 'control-arrow'];

    return <button onClick={ clickHandler } aria-label="prev slide / item"
                   className={ arrowClasses.join(' ') }>
        <SliderPrev/>
    </button>;
};

const renderArrowNext = (clickHandler: () => void, hasPrev: boolean, label: string) => {
    const arrowClasses = ['slider-control__next', 'control-arrow'];

    return <button onClick={ clickHandler } aria-label="next slide / item"
                   className={ arrowClasses.join(' ') }>
        <SliderNext/>
    </button>;
};

const Welcome = () => {

    return <section className={ classes.welcome }>
        <Carousel { ...sliderProps() } >

            { projectsData.map((project, index) =>
                <div key={ index }>
                    <div className={ classes['welcome__project-image'] }>
                        <img src={ project.image } alt="slide 1"/>
                        <Overlay/>
                    </div>
                    <div className={ classes['welcome__project-details-wrapper'] }>
                        <ProjectDetails project={ project }/>
                    </div>
                </div>,
            ) }

        </Carousel>
    </section>;
};

export default Welcome;

//     <div className="scroll-down">
//         <div className="arrow scroll-down__button"></div>
//     </div>
