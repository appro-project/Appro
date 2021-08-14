import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import house_1 from '../../../assets/img/main/welcome/house_1.jpg';
import house_2 from '../../../assets/img/main/welcome/house_2.jpg';

const ImageCarousel = () =>
    <Carousel showStatus={ false }>
        <div>
            <img src={ house_1 }/>
        </div>
        <div>
            <img src={ house_2 }/>
        </div>
        <div>
            <img src={ house_1 }/>
        </div>
    </Carousel>;

export default ImageCarousel;
