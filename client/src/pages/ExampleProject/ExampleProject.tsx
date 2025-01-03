import { Container } from '@/containers/hoc/Container/Container'
import React from 'react'
import classes from './ExampleProject.module.scss'
import ImageCarousel from '../ExampleProject/ImageCarousel/ImageCarousel'
import { plan1, plan2, plan3, plan4 } from './importImages'

export const ExampleProject = () => {
	return (
		<div className={classes.exampleProject}>
			<Container>
				<div className={classes['example-project__header']}>
					<h1>Пример проекта</h1>
				</div>
				<div className={classes['example-project__plan']}>
					<div className={classes['example-project__title']}>
						<h2>Архитектура и констуркции</h2>
					</div>
					<ImageCarousel images={plan1} />
				</div>
				<div className={classes['example-project__plan']}>
					<div className={classes['example-project__title']}>
						<h2>Вода и канализация</h2>
					</div>
					<ImageCarousel images={plan2} />
				</div>
				<div className={classes['example-project__plan']}>
					<div className={classes['example-project__title']}>
						<h2>Отопление и вентиляция</h2>
					</div>
					<ImageCarousel images={plan3} />
				</div>
				<div className={classes['example-project__plan']}>
					<div className={classes['example-project__title']}>
						<h2>Электрика</h2>
					</div>
					<ImageCarousel images={plan4} />
				</div>
			</Container>
		</div>
	)
}
