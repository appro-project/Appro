import { Container } from '@/containers/hoc/Container/Container'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classes from './ExampleProject.module.scss'
import ImageCarousel from '../ExampleProject/ImageCarousel/ImageCarousel'
import { plan1, plan2, plan3, plan4 } from './importImages'

export const ExampleProject = () => {
	const {t} = useTranslation();
	return (
		<div className={classes.exampleProject}>
			<Container>
				<div className={classes['example-project__header']}>
					<h1>{t('example-project.header')}</h1>
				</div>
				<div className={classes['example-project__plan']}>
					<div className={classes['example-project__title']}>
						<h2>{t('example-project.section1_title')}</h2>
					</div>
					<ImageCarousel images={plan1} />
				</div>
				<div className={classes['example-project__plan']}>
					<div className={classes['example-project__title']}>
						<h2>{t('example-project.section2_title')}</h2>
					</div>
					<ImageCarousel images={plan2} />
				</div>
				<div className={classes['example-project__plan']}>
					<div className={classes['example-project__title']}>
						<h2>{t('example-project.section3_title')}</h2>
					</div>
					<ImageCarousel images={plan3} />
				</div>
				<div className={classes['example-project__plan']}>
					<div className={classes['example-project__title']}>
						<h2>{t('example-project.section4_title')}</h2>
					</div>
					<ImageCarousel images={plan4} />
				</div>
			</Container>
		</div>
	)
}
