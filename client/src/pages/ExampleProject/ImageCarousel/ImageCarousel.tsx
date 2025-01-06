import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' 
import './ImageCarousel.scss'
import { ReactComponent as SliderPrev } from '@/assets/img/main/welcome/slider-prev.svg'
import { ReactComponent as SliderNext } from '@/assets/img/main/welcome/slider-next.svg'

const ImageCarousel = ({ images }) => {
const renderArrowPrev = (clickHandler: () => void) => {
    const arrowClasses = ['slider-control__prev', 'control-arrow'];

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
	const arrowClasses = ['slider-control__next', 'control-arrow'];

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
		<div className={'image-carousel'}>
			<Carousel
				showThumbs={false}
				showStatus={false}
				renderArrowNext={renderArrowNext}
				renderArrowPrev={renderArrowPrev}
				infiniteLoop
				interval={4000}
			>
				{images.map((image, index) => (
					<div className={'image-carousel__image'} key={index}>
						<img src={image} alt={`Page ${index + 1}`} />
					</div>
				))}
			</Carousel>
		</div>
	)
}

export default ImageCarousel
