import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' 
import classes from './ImageCarousel.module.scss'
import '../../Main/Welcome/carousel-custom.scss'
import { ReactComponent as SliderPrev } from '@/assets/img/main/welcome/slider-prev.svg'
import { ReactComponent as SliderNext } from '@/assets/img/main/welcome/slider-next.svg'

const ImageCarousel = ({ images }) => {
const renderArrowPrev = (clickHandler: () => void) => {
    const arrowClasses = ['slider-control__prev', 'control-arrow']

	return (
		<button
			onClick={clickHandler}
			aria-label='prev slide / item'
			className={arrowClasses.join(' ')}>
			<SliderPrev />
		</button>
	)
}

const renderArrowNext = (clickHandler: () => void) => {
	const arrowClasses = ['slider-control__next', 'control-arrow']

	return (
		<button
			onClick={clickHandler}
			aria-label='next slide / item'
			className={arrowClasses.join(' ')}>
			<SliderNext />
		</button>
	)
}

	return (
		<Carousel
			showThumbs={false}
			showStatus={false}
			renderArrowNext={renderArrowNext}
			renderArrowPrev={renderArrowPrev}
			infiniteLoop
			interval={4000}>
			{images.map((image, index) => (
				<div className={classes['example-project__image']} key={index}>
					<img src={image} alt={`Page ${index + 1}`} />
				</div>
			))}
		</Carousel>
	)
}

export default ImageCarousel
