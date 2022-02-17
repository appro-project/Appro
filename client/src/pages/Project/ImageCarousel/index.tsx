import React, { ReactElement } from 'react';
// import { Carousel } from 'react-responsive-carousel';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';

import './override.css';
import classes from './index.module.scss';

interface Props {
  images: string[];
}

const ImageCarousel = ({ images }: Props): ReactElement => {
  const imagesWithThumbnail = images.map((image) => ({
    original: image,
    thumbnail: image,
    thumbnailClass: classes.ImageCarousel_Thumbnail,
    originalClass: classes.ImageCarousel_SlideImage,
  }));

  return <ImageGallery items={imagesWithThumbnail} showThumbnails={true} thumbnailPosition={'left'} showNav={false} />;
};

export default ImageCarousel;
