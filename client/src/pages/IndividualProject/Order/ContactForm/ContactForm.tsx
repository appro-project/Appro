import classes from '../Order.module.scss'
import { TextInput } from '@/components/UI/TextInput/TextInput'
import { TextArea } from '@/components/UI/TextArea/TabArea'
import { Button, ButtonType } from '@/components/UI/Button/Button'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

export const ContactForm: FC = memo(() => {
	const {t} = useTranslation();
	return (
		<form className={classes['order__form']}>
			<div className={classes['order__input']}>
				<TextInput placeholder={t('individual.contact_form.name')} />
			</div>
			<div className={classes['order__input']}>
				<TextInput
					placeholder={t('individual.contact_form.phone')}
					type='tel'
				/>
			</div>
			<div className={classes['order__input']}>
				<TextArea placeholder={t('individual.contact_form.message')} />
			</div>

			<div className={classes['order__submit']}>
				<Button
					title={t('individual.contact_form.button')}
					buttonType={ButtonType.BIG}
				/>
			</div>
		</form>
	)
})

