import { useState, useTransition } from 'react'
import { useTranslation } from 'react-i18next'

import classes from './Feedback.module.scss'
import { Container } from '@/containers/hoc/Container/Container'
import { TextInput } from '@/components/UI/TextInput/TextInput'
import { Button, ButtonType } from '@/components/UI/Button/Button'
import { Controller, useForm } from 'react-hook-form'
import { axiosPostFeedback } from '@/services/server-data'

export interface IFeedbackForm {
	name: string;
	email?: string;
	phone: string;
	feedback: string;
	project?: string;
	data?: string;
	time?: string;
	anytime?: boolean;
}

export const Feedback = () => {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const { handleSubmit, formState: { errors }, control, reset } = useForm<IFeedbackForm>({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			feedback: ''
		},
		mode: 'all',
		reValidateMode: 'onChange'
	})

	const onSubmit = async (value: IFeedbackForm) => {
		try {
			setError(false)
			setLoading(true)

			await axiosPostFeedback(value)

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
								render={props => (
									<TextInput
										error={!!errors.name}
										{...props}
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
								rules={{}}
								render={props => (
									<TextInput
										error={!!errors.phone}
										{...props}
										placeholder={t('main.feedback.phone')}
									/>
								)}
							/>
						</div>

						{/*TODO: Where is form?!??!!?!?!?*/}
						<div className={classes['feedback__input']}>
							<Controller
								name='feedback'
								control={control}
								defaultValue={''}
								rules={{}}
								render={props => (
									<TextInput
										error={!!errors.feedback}
										{...props}
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

