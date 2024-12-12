import { ImageInfo } from '@/api/model'
import './Gallery.scss'
import { FC } from 'react'

interface GalleryProps {
	photos: ImageInfo[]
}

export const Gallery: FC<GalleryProps> = ({ photos }) => {
	return (
		<section className='project-section project-gallery'>
			<h3 className='project-section__title'>Проект в реализации</h3>
			<div className='project-gallery__wrapper'>
				{photos.map(photo => (
					<div key={photo.id} className='project-gallery__item'>
						<img src={photo.path} alt='' />
					</div>
				))}
			</div>
		</section>
	)
}
