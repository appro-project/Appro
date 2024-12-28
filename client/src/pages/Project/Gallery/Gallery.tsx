import { ImageInfo } from '@/api/model'
import './Gallery.scss'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface GalleryProps {
	photos: ImageInfo[]
}

export const Gallery: FC<GalleryProps> = ({ photos }) => {
    const {t} = useTranslation();

	return (
		<section className='project-section project-gallery'>
			<h3 className='project-section__title'>
				{t('project.project_in_progress')}
			</h3>
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
