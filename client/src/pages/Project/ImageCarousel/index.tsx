import React from 'react';
import { Carousel } from 'react-responsive-carousel';

interface Props{
    images: string[];
}
const ImageCarousel = ({ images }: Props) =>
    <Carousel showStatus={ false }>
        {
            images.map((image, idx) => <div key={ idx }>
                <img src={ image } alt={ 'project image' }/>
            </div>)
        }
    </Carousel>;

export default ImageCarousel;
