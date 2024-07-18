import { useState } from 'react'

import './Changes.scss'

import project_modification from '@/assets/img/project_page/project-modification.jpg'
import { Project } from '@/entity/Project'
import { Controller, useForm } from 'react-hook-form'
import { IFeedbackForm } from '@/pages/Main/Feedback/Feedback'
import { axiosPostFeedback } from '@/services/server-data'
import { Button, ButtonType } from '@/components/UI/Button/Button'
import {ProjectDto} from "@/api/model";

interface IChangesProps {
	project: ProjectDto;
}

export const Changes = ({ project }: IChangesProps) => {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const { handleSubmit, formState: { errors }, control, reset } = useForm<IFeedbackForm>({
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
			<h3 className='project-section__title project-modification__title'>Внесение изменений</h3>
			<div className='project-section__text'>
				<p>
					Большое количество изменений в типовом проекте не придаст вашему будущему дому индивидуальности – он все же
					останется типовым. Разумно сделать ваш дом особенным, учитывая все требования и состав желаемых помещений.
				</p>
				<p>
					Ваше желание и чуть больше времени наших архитекторов, дизайнеров и инженеров сделают дом полностью
					индивидуальным.
				</p>
				<div className='project-modification__wrapper'>
					<div className='project-modification__img'>
						<img src={project_modification} alt='' />
					</div>
					<div className='project-modification__info'>
						<div className='project-modification__info-title'>
							Во все типовые проекты домов можно внести такие изменения:
						</div>
						<ul className='project-modification__info-list'>
							<li>- тип фундамента относительно рельефа и геологических особенностей местности строительства</li>
							<li>- замена материала несущих стен</li>
							<li>- высота помещений, этажа</li>
							<li>
								- функциональное назначение комнат с изменением планировочных решений, но без изменений геометрии
								несущих стен
							</li>
							<li>- размеры оконных и дверных проемов и их количество</li>
							<li>- угол наклона кровли и навесов, замена материала кровли</li>
							<li>- замена наружной отделки стен и цоколя</li>
							<li>- убрать или добавить гараж, навес</li>
							<li>- выполнение проекта в зеркальном отображении</li>
						</ul>
					</div>
				</div>
				<p>Узнать стоимость внесения изменений и адаптации проекта под ваши пожелания можно по телефону:</p>
				<p>
					<a href='tel:+380442213636'>+38 (044) 221 36 36</a>
					<br />
					<a href='tel:+380672343636'>+38 (067) 23436 36</a>
				</p>
				<p>Или заполнив форму ниже. После получения заявки, мы вам перезвоним.</p>
				<form onSubmit={handleSubmit(onSubmit)} className='project-modification__form'>
					<div className='form-field'>
						<input
							className='form-field__input'
							name='project'
							type='text'
							placeholder='Проект'
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
							render={(props) => (
								<textarea
									className='form-field__input'
									{...props}
									name='feedback'
									cols={30}
									rows={10}
									placeholder='Ваше собщение'
								/>
							)}
						/>
						{/*<textarea className="form-field__input" name="feedback" cols={30} rows={10} placeholder="Ваше собщение" />*/}
					</div>

					<div className='form-field'>
						<Controller
							name='phone'
							control={control}

							render={(props) => (
								<input
									{...props}
									className='form-field__input'
									name='phone'
									type='text'
									placeholder='Номер телефона'
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
							render={(props) => (
								<input className='form-field__input' {...props} placeholder='Имя' />
							)}
						/>

					</div>
					<div className='form-field form-field_btn'>
						<Button disabled={loading} buttonType={ButtonType.BIG} title='Отправить сообщение' />

					</div>
				</form>
			</div>
		</section>
	)
}

