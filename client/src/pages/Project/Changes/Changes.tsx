import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import './Changes.scss'

import project_modification from '@/assets/img/project_page/project-modification.jpg'
import { Project } from '@/entity/Project'
import { Controller, useForm } from 'react-hook-form'
import { IFeedbackForm } from '@/pages/Main/Feedback/Feedback'
import { axiosPostFeedback } from '@/services/server-data'
import { Button, ButtonType } from '@/components/UI/Button/Button'
import { ProjectDto } from '@/api/model'

interface IChangesProps {
	project: ProjectDto
}

export const Changes = ({ project }: IChangesProps) => {
	const { t } = useTranslation()

	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const {
		handleSubmit,
		formState: { errors },
		control,
		reset
	} = useForm<IFeedbackForm>({
		defaultValues: {
			name: '',
			phone: '',
			feedback: '',
			project: ''
		},
		mode: 'all',
		reValidateMode: 'onChange'
	})

	const onSubmit = async (value: IFeedbackForm) => {
		console.log(value)
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

	return (
		<section className='project-section project-modification'>
			<h3 className='project-section__title project-modification__title'>
				{t('catalogue.changes.title')}
			</h3>
			<div className='project-section__text'>
				<p>{t('catalogue.changes.description1')}</p>
				<p>{t('catalogue.changes.description2')}</p>
				<div className='project-modification__wrapper'>
					<div className='project-modification__img'>
						<img src={project_modification} alt='' />
					</div>
					<div className='project-modification__info'>
						<div className='project-modification__info-title'>
							{t('catalogue.changes.list.title')}
						</div>
						<ul className='project-modification__info-list'>
							<li>{t('catalogue.changes.list.item1')}</li>
							<li>{t('catalogue.changes.list.item2')}</li>
							<li>{t('catalogue.changes.list.item3')}</li>
							<li>{t('catalogue.changes.list.item4')}</li>
							<li>{t('catalogue.changes.list.item5')}</li>
							<li>{t('catalogue.changes.list.item6')}</li>
							<li>{t('catalogue.changes.list.item7')}</li>
							<li>{t('catalogue.changes.list.item8')}</li>
							<li>{t('catalogue.changes.list.item9')}</li>
						</ul>
					</div>
				</div>
				<p>{t('catalogue.changes.price_info')}</p>
				<p>
					<a href='tel:+380442213636'>+38 (044) 221 36 36</a>
					<br />
					<a href='tel:+380672343636'>+38 (067) 23436 36</a>
				</p>
				<p>{t('catalogue.changes.contact_info')}</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='project-modification__form'
				>
					<div className='form-field'>
						<input
							className='form-field__input'
							name='project'
							type='text'
							placeholder={t('catalogue.form.project_name')}
							value={project.title}
							disabled
						/>
					</div>
					<div className='form-field form-field_textarea'>
						<Controller
							name='feedback'
							control={control}
							defaultValue={''}
							rules={{}}
							render={props => (
								<textarea
									className='form-field__input'
									{...props}
									name='feedback'
									cols={30}
									rows={10}
									placeholder={t('catalogue.form.message')}
								/>
							)}
						/>
						{/*<textarea className="form-field__input" name="feedback" cols={30} rows={10} placeholder="Ваше собщение" />*/}
					</div>

					<div className='form-field'>
						<Controller
							name='phone'
							control={control}
							render={props => (
								<input
									{...props}
									className='form-field__input'
									name='phone'
									type='text'
									placeholder={t('catalogue.form.phone')}
								/>
							)}
						/>
					</div>
					<div className='form-field'>
						<Controller
							name='name'
							control={control}
							defaultValue={''}
							rules={{ required: true }}
							render={props => (
								<input
									className='form-field__input'
									{...props}
									placeholder={t('catalogue.form.name')}
								/>
							)}
						/>
					</div>
					<div className='form-field form-field_btn'>
						<Button
							disabled={loading}
							buttonType={ButtonType.BIG}
							title={t('catalogue.form.button')}
						/>
					</div>
				</form>
			</div>
		</section>
	)
}
