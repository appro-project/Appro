import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import classes from '../pages/Main/Feedback/Feedback.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from '@/components/UI/TextInput/TextInput'
import { Button, ButtonType } from '@/components/UI/Button/Button'
import { axiosPostFeedback, axiosPostTelegramFeedback } from '@/services/server-data'
import { IFeedbackForm } from '@/pages/Main/Feedback/Feedback'

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
	const { handleSubmit, formState:{errors}, control, reset } = useForm<IFeedbackForm>({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			content: ''
		},
		reValidateMode: 'onChange'
	})

	const onSubmit = async (value: IFeedbackForm) => {
		try {
		  setError(false);
		  setLoading(true);
	  
		  await Promise.all([
			axiosPostFeedback({ ...value, project }),
			axiosPostTelegramFeedback({ ...value, project }),
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
							rules={{
								required: t('form_error_messages.not_empty'),
								validate: (value) =>
									value.trim().length > 0 || t('form_error_messages.without_tabulation'),
							  }}
							render={({ field, fieldState: { error } }) => (
								<>
									<TextInput {...field} placeholder={t('modal.name')} error={!!error} />
									{error && <span className={classes['feedback__error']}>{error.message}</span>}
								</>
							)}
						/>
					</div>
					<div className={classes['feedback__input']}>
						<Controller
							name='email'
							control={control}
							defaultValue={''}
							rules={{
								required: t('form_error_messages.not_empty'),
								pattern: {
									value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
									message: t('form_error_messages.email')
								} 
							}}

							render={({ field, fieldState: { error } }) => (
								<>
									<TextInput  {...field} error={!!errors.email}  placeholder='E-mail' />
									{error && <span className={classes['feedback__error']}>{error.message}</span>}
								</>
							)}
						/>
					</div>
					<div className={classes['feedback__input']}>
						<Controller
							name='phone'
							control={control}
							defaultValue={''}
							rules={{
								required: t('form_error_messages.not_empty'),
								pattern: {
								  value: /^\+380 \d{9}$/,
								  message: t('form_error_messages.phone'),
								},
							  }}
							render={({ field: props, fieldState: { error }  }) => (
								<>
									<TextInput
										error={!!errors.phone}
										{...props}
										mask={'+380 999999999'}
										placeholder={t('modal.phone')}
									/>
									{error && <span className={classes['feedback__error']}>{error.message}</span>}
								</>
							)}
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
