import React from 'react'
import classes from './SuccessPopup.module.scss'
import { useTranslation } from 'react-i18next'

const SuccessPopup = () => {
const {t} = useTranslation()

	return (
		<div className={classes.popup}>
			<p>{t('modal.popup__message')}</p>
		</div>
	)
}

export default SuccessPopup
