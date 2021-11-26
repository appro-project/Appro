import React from 'react';

import classes from './Welcome.module.scss';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel-custom.scss';
import {Carousel} from 'react-responsive-carousel';

import {Project} from "../../../entity/Project";
import {Slide} from "../../../entity/Slide";
import ProjectItem from "./ProjectItem";

interface PropsType {
    mockProjects: Project[];
    sliderProps: Slide;
}

const Welcome: React.FC<PropsType> = ({mockProjects, sliderProps}) => {

    return <section className={classes.welcome}>
        <Carousel {...sliderProps()} >
            {mockProjects.map((project, index) => <ProjectItem key={index} project={project}/>)}
        </Carousel>
    </section>;
};

export default Welcome;
