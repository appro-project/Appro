import { FC, ReactElement } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import classes from './index.module.scss'
import ReactPlayer from 'react-player';

interface ImageCarouselProps {
	images: string[];
	videoUrl?: string;
}

export const ImageCarousel:FC<ImageCarouselProps> = ({ images, videoUrl }) => {
	const imagesWithThumbnail = images.map((image) => ({
		original: image,
		thumbnail: image,
		thumbnailClass: classes.ImageCarousel_Thumbnail,
		originalClass: classes.ImageCarousel_SlideImage
	}))

	if (videoUrl) {
		imagesWithThumbnail.unshift({
		  original: `https://img.youtube.com/vi/${getYouTubeId(videoUrl)}/maxresdefault.jpg`,
		  thumbnail: `https://img.youtube.com/vi/${getYouTubeId(videoUrl)}/0.jpg`,
		  thumbnailClass: classes.ImageCarousel_Thumbnail,
		  originalClass: classes.ImageCarousel_SlideImage,
		  renderItem: () => (
			<div className="video-wrapper">
			  <ReactPlayer url={videoUrl} controls width="100%" height="500px" />
			</div>
		  ),
		} as any);
	  }

	return <ImageGallery items={imagesWithThumbnail} showThumbnails={true} thumbnailPosition={'left'} showNav={false} />
}

const getYouTubeId = (url: string): string => {
	const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/)([\w-]+))/);
	console.log(match[1])
	return match ? match[1] : "";
};

