import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import classes from '../pages/Main/Feedback/Feedback.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from '@/components/UI/TextInput/TextInput'
import { Button, ButtonType } from '@/components/UI/Button/Button'
import { axiosPostFeedback } from '@/services/server-data'
import { IFeedbackForm } from '@/pages/Main/Feedback/Feedback'
import { Checkbox } from '@/components/UI/Checkbox/Checkbox'

interface OrderModalProps {
	onClose: () => void;
	project: string;
}

const OrderModal = ({ onClose, project }: OrderModalProps) => {
	const {t} = useTranslation();
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [anytime, setAnytime] = useState(false)
	const { handleSubmit, formState:{errors}, control, reset } = useForm<IFeedbackForm>({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			feedback: '',
			data: '',
			time: ''
		}
	})

	const onSubmit = async (value: IFeedbackForm) => {
		try {
			setError(false)
			setLoading(true)
			console.log('value', value)

			const date:Date = value.data && value.data.length > 0 ? new Date(value.data) : new Date()

			if (date.getDate() < Date.now()) {
				setError(true)
				setLoading(false)
			} else if ((!value.data && value.time) || (value.data && !value.time)) {
				setError(true)
				setLoading(false)
			} else {
				await axiosPostFeedback({ ...value, anytime, project })
				setLoading(false)
				reset()
				onClose()
			}
		} catch (e) {
			console.log(e)
			setError(true)
			setLoading(false)
		}
	}

	return (
		<div className={'modal-wrapper'}>
			<span onClick={onClose}>x</span>
			<div className={'modal-content'}>
				<h3 className={'modal__text--big modal__margin--small'}>
					{t('modal.order_data')}
				</h3>
				<p className={'modal__text--grey modal__margin--normal'}>
					{t('modal.no_spam')}
				</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={classes['feedback__form']}
				>
					<div className={classes['feedback__input']}>
						<Controller
							name='name'
							control={control}
							defaultValue={''}
							rules={{ required: true }}
							render={props => (
								<TextInput
									error={!!errors.name}
									{...props}
									placeholder={t('modal.name')}
								/>
							)}
						/>
					</div>
					<div className={classes['feedback__input']}>
						<Controller
							name='email'
							control={control}
							defaultValue={''}
							rules={{
								required: true,
								pattern:
									/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
							}}
							render={props => (
								<TextInput
									{...props}
									error={!!errors.email}
									placeholder='E-mail'
								/>
							)}
						/>
					</div>
					<div className={classes['feedback__input']}>
						<Controller
							name='phone'
							control={control}
							defaultValue={''}
							rules={{
								required: true
							}}
							render={props => (
								<TextInput
									error={!!errors.phone}
									{...props}
									mask={'+380 999999999'}
									placeholder={t('modal.phone')}
								/>
							)}
						/>
					</div>
					<h3 className={'modal__text--big modal__margin--normal'}>
						{t('modal.contact_time')}
					</h3>
					<div className={'model__button-wrapper'}>
						<Controller
							name='data'
							control={control}
							defaultValue={''}
							rules={{
								pattern:
									/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
							}}
							render={props => (
								<TextInput
									mask={'99.99.9999'}
									error={error || !!errors.data}
									{...props}
									placeholder={t('modal.date')}
								/>
							)}
						/>
						<Controller
							name='time'
							control={control}
							defaultValue={''}
							rules={{ pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/ }}
							render={props => (
								<TextInput
									mask={'99:99'}
									error={error || !!errors.time}
									{...props}
									placeholder={t('modal.time')}
								/>
							)}
						/>
					</div>
					<div className={classes['feedback__input']}>
						<Checkbox
							labelName={t('modal.anytime_call')}
							htmlFor={'anytime'}
							// @ts-ignore
							onClick={() => {
								setAnytime(!anytime)
							}}
							checked={anytime}
							id={'anytime'}
						/>
					</div>
					<h3 className={'modal__text--big modal__margin--normal'}>
						{t('modal.comment')}
					</h3>
					{/*TODO: Where is form?!??!!?!?!?*/}
					<div className={classes['feedback__input']}>
						<Controller
							name='feedback'
							control={control}
							defaultValue={''}
							rules={{}}
							render={props => (
								<TextInput {...props} placeholder={t('modal.message')} />
							)}
						/>
					</div>
					<p className={'modal__text--black'}>{t('modal.agree_terms')}</p>
					<div className={'model__button-wrapper'}>
						<Button
							width={'100%'}
							disabled={loading}
							buttonType={ButtonType.EXTENDED}
							title={t('modal.submit_button')}
						/>
						<Button
							width={'100%'}
							disabled={loading}
							actionHandler={onClose}
							buttonType={ButtonType.EXTENDED_TRANSPARENT}
							color={'#202020'}
							title={t('modal.cancel_button')}
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default OrderModal
