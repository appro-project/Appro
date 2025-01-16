import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import classes from './About.module.scss'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

import { Link } from 'react-router-dom'

import team_photo from '@/assets/img/aboutUs/about-main-1.jpg'
import certificate from '@/assets/img/main/about/certificate.jpg'
import { Container } from '@/containers/hoc/Container/Container'
import { Button } from '@/components/UI/Button/Button'

export const About = () => {
	const [isOpen, setOpen] = useState(false)
    const {t} = useTranslation();

	return (
		<section className={classes['about']}>
			<Container>
				<div className={classes['about__title']}>
					{t('main.about_us.title')}
				</div>
				<div className={classes['about__body']}>
					<div className={classes['about__photo']}>
						<img src={team_photo} alt='Team photo' />
					</div>
					<div
						className={classes['about__certificate']}
						onClick={() => setOpen(true)}
					>
						{isOpen && (
							<Lightbox
								mainSrc={certificate}
								onCloseRequest={() => setOpen(false)}
							/>
						)}
						<img src={certificate} alt='certificate' />
					</div>
					<div className={classes['about__description']}>
						<div className={classes['about__description-text']}>
							<p>{t('main.about_us.description1')}</p>
							<p>{t('main.about_us.description2')}</p>
							<p>{t('main.about_us.description3')}</p>
							<p>{t('main.about_us.description4')}</p>
							<p>{t('main.about_us.description5')}</p>
						</div>
						<div className={classes['about__description-details']}>
							<Link
								to='/about'
								onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
							>
								<Button title={t('main.about_us.details')} />
							</Link>
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}

