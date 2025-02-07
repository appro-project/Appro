import { FC, ReactElement } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import classes from './index.module.scss'
import ReactPlayer from 'react-player';

interface ImageCarouselProps {
	mainImage?: string;
	images: string[];
	videoUrl?: string;
}

export const ImageCarousel: FC<ImageCarouselProps> = ({ mainImage, images, videoUrl }) => {
	const items = [
	  mainImage && { original: mainImage, thumbnail: mainImage },
	  videoUrl && {
		original: `https://img.youtube.com/vi/${getYouTubeId(videoUrl)}/maxresdefault.jpg`,
		thumbnail: `https://img.youtube.com/vi/${getYouTubeId(videoUrl)}/0.jpg`,
		renderItem: () => (
		  <div className="video-wrapper">
			<ReactPlayer url={videoUrl} controls width="100%" />
		  </div>
		),
	  },
	  ...images.map((image) => ({ original: image, thumbnail: image })),
	].filter(Boolean) as any[];
  
	items.forEach((item) => {
	  Object.assign(item, {
		thumbnailClass: classes.ImageCarousel_Thumbnail,
		originalClass: classes.ImageCarousel_SlideImage,
	  });
	});
  
	return <ImageGallery items={items} showThumbnails thumbnailPosition="left" showNav={false} />;
  };

const getYouTubeId = (url: string): string => {
	const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/)([\w-]+))/);
	console.log(match[1])
	return match ? match[1] : "";
};

