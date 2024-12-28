import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import classes from './Steps.module.scss'
import { StepInfo, steps } from '@/constants/Steps'

export const Steps = memo(() => {
	const { t } = useTranslation();
	return (
		<div className={classes['steps']}>
			<h3 className={classes['steps__title']}>{t('individual.steps.title')}</h3>
			<div className={classes['steps__step-items']}>
				{steps.map((s, index) => createStep(s, index + 1))}
			</div>
		</div>
	)
})

const createStep = (step: StepInfo, stepNumber: number) => {
	const { t } = useTranslation();
	return (
		<div className={classes['steps__step-item']}>
			<div className={classes['steps__step-number']}>{stepNumber}</div>
			<div className={classes['steps__step-title']}>{t(step.title)}</div>
			<div className={classes['steps__step-description']}>
				{t(step.description)}
			</div>
		</div>
	)
}
