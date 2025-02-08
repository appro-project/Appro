import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import classes from '../pages/Main/Feedback/Feedback.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from '@/components/UI/TextInput/TextInput'
import { Button, ButtonType } from '@/components/UI/Button/Button'
import { axiosPostFeedback, axiosPostTelegramFeedback } from '@/services/server-data'
import { IFeedbackForm } from '@/pages/Main/Feedback/Feedback'
import { Checkbox } from '@/components/UI/Checkbox/Checkbox'
import { parseDate } from '@/services/util'

interface OrderModalProps {
	onClose: () => void;
	project: string;
	title: string
	onFormSubmit: () => void
}

const OrderModal = ({ onClose, project, title, onFormSubmit }: OrderModalProps) => {
  const {t} = useTranslation();
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [anyTime, setAnyTime] = useState(false)
	const { handleSubmit, formState:{errors}, control, reset } = useForm<IFeedbackForm>({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			content: '',
			date: '',
			time: ''
		},
		reValidateMode: 'onChange'
	})

	const onSubmit = async (value: IFeedbackForm) => {
		try {
		  setError(false);
		  setLoading(true);
	  
		  const hasDate = Boolean(value.date?.length);
		  const hasTime = Boolean(value.time?.length);
		  
		  if (hasDate !== hasTime) throw new Error();
	  
		  const requestedDate = hasDate && hasTime ? parseDate(value.date!, value.time!) : new Date();
		  if (requestedDate.getTime() < Date.now()) throw new Error();
	  
		  await Promise.all([
			axiosPostFeedback({ ...value, anyTime, project }),
			axiosPostTelegramFeedback({ ...value, anyTime, project }),
		  ]);
	  
		  reset();
		  onClose();
		  onFormSubmit();
		} catch (e) {
		  console.error(e);
		  setError(true);
		} finally {
		  setLoading(false);
		}
	  };

	return (
		<div className={'modal-wrapper'}>
			<div className={'close-modal-icon'} onClick={onClose} />
			<div className={'modal-content'}>
				<h3 className={'modal__text--big modal__margin--small'}>
					{title}
				</h3>
				<p className={'modal__text--grey modal__margin--normal'}>
					{t('modal.no_spam')}
				</p>
				
				<form onSubmit={handleSubmit(onSubmit)} className={classes['feedback__form']}>
					<div className={classes['feedback__input']}>
						<Controller
							name='name'
							control={control}
							defaultValue={''}
							rules={{ required: true }}
							render={({ field, fieldState: { error } }) => (
								<TextInput {...field} placeholder={t('modal.name')} error={!!error} />
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

							render={({ field, fieldState: { error } }) => (
								<TextInput  {...field} error={!!errors.email}  placeholder='E-mail' />

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
							render={({ field: props }) => (
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
							name='date'
							control={control}
							defaultValue={''}

							rules={{
								validate: (value) => 
									!value || /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(value)
									? true
									: false,
							}}
							render={({ field: props }) => (
								<TextInput
									mask={'99/99/9999'}
									error={error || !!errors.date}
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

							render={({ field: props }) => (
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
								setAnyTime(!anyTime)
							}}
							checked={anyTime}
							id={'anytime'}
						/>
					</div>
					<h3 className={'modal__text--big modal__margin--normal'}>
						{t('modal.comment')}
					</h3>
					{/*TODO: Where is form?!??!!?!?!?*/}
					<div className={classes['feedback__input']}>
						<Controller
							name='content'
							control={control}
							defaultValue={''}
							rules={{}}
							render={({ field: props }) => (
								<TextInput  {...props} placeholder={t('modal.message')} />
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
