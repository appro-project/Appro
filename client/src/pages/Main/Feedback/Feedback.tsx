import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import classes from './Feedback.module.scss'
import { Container } from '@/containers/hoc/Container/Container'
import { TextInput } from '@/components/UI/TextInput/TextInput'
import { Button, ButtonType } from '@/components/UI/Button/Button'
import { Controller, useForm } from 'react-hook-form'
import { axiosPostFeedback, axiosPostTelegramFeedback } from '@/services/server-data'

export interface IFeedbackForm {
	name: string;
	email?: string;
	phone: string;
	content?: string;
	project?: string;
	date?: string;
	time?: string;
	anyTime?: boolean;
}

export const Feedback = () => {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const { handleSubmit, formState: { errors }, control, reset } = useForm<IFeedbackForm>({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			content: ''
		},
		mode: 'all',
		reValidateMode: 'onChange'
	})

	const onSubmit = async (value: IFeedbackForm) => {
		try {
			setError(false)
			setLoading(true)

			await axiosPostFeedback(value)
			await axiosPostTelegramFeedback(value)

			setLoading(false)
		} catch (e) {
			console.log(e)
			setError(true)
			setLoading(true)
		}
		reset()
	}

	const {t} = useTranslation();

	return (
		<section id={'feedback-form'} className={classes['feedback']}>
			<Container>
				<div className={classes['feedback__header']}>
					{t('main.feedback.title')}
				</div>

				<div className={classes['feedback__body']}>
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
								render={({ field }) => (
									<TextInput
									   {...field}
									   error={!!errors.name}
									   placeholder={t('main.feedback.name')}
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
								render={({ field }) => (
									<TextInput
										{...field}
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
								rules={{}}
								render={({ field }) => (
									<TextInput
										error={!!error}
										{...field}
										mask={'+380 999999999'}
										placeholder={t('main.feedback.phone')}
									/>
								)}
							/>
						</div>
						
						<div className={classes['feedback__input']}>
							<Controller
								name='content'
								control={control}
								defaultValue={''}
								rules={{}}
								render={({ field }) => (
									<TextInput
										error={!!errors.content}
										{...field}
										placeholder={t('main.feedback.message')}
									/>
								)}
							/>
						</div>
						<Button
							disabled={loading}
							buttonType={ButtonType.BIG}
							title={t('main.feedback.button')}
						/>
					</form>
				</div>
			</Container>
		</section>
	)
}

