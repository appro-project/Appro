import classes from '../Order.module.scss'
import { TextInput } from '@/components/UI/TextInput/TextInput'
import { TextArea } from '@/components/UI/TextArea/TabArea'
import { Button, ButtonType } from '@/components/UI/Button/Button'
import { FC, memo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IFeedbackForm } from '@/pages/Main/Feedback/Feedback'
import { axiosPostFeedback, axiosPostTelegramFeedback } from '@/services/server-data'

export const ContactForm: FC = memo(() => {
	const [loading, setLoading] = useState(false)
	const { control, handleSubmit, reset } = useForm<IFeedbackForm>({
		defaultValues: {
			name: '',
			phone: '',
			content: ''
		}
	})

	const onSubmit = async (value: IFeedbackForm) => {
		try {
			setLoading(true)

			await axiosPostFeedback(value)
			await axiosPostTelegramFeedback(value)

			reset()
			setLoading(false)
		} catch (e) {
			console.log(e)
			setLoading(true)
		}
	}

	return (
		<form className={classes['order__form']} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes['order__input']}>
				<Controller
					name='name'
					control={control}
					rules={{ required: 'Имя обязательно' }}
					render={({ field, fieldState: { error } }) => (
						<TextInput {...field} placeholder='Имя' error={!!error} />
					)}
				/>
			</div>

			<div className={classes['order__input']}>
				<Controller
					name='phone'
					control={control}
					rules={{
						required: 'Номер телефона обязателен',
					}}
					render={({ field, fieldState: { error } }) => (
						<TextInput
							error={!!error}
							{...field}
							mask={'+380 999999999'}
							placeholder='Номер телефона'
						/>
					)}
				/>
			</div>

			<div className={classes['order__input']}>
				<Controller
					name='content'
					control={control}
					render={({ field, fieldState: { error } }) => (
						<TextArea
							{...field}
							placeholder='Сообщение (необязательно)'
							error={!!error}
						/>
					)}
				/>
			</div>

			<div className={classes['order__submit']}>
				<Button disabled={loading} title='Отправить сообщение' buttonType={ButtonType.BIG} />
			</div>
		</form>
	)
})
