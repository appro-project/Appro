import { useState } from 'react'
import './Changes.scss'
import project_modification from '@/assets/img/project_page/project-modification.jpg'
import { Button, ButtonType } from '@/components/UI/Button/Button'
import {ProjectDto} from "@/api/model";
import { OrderModalContainer } from '@/modal/OrderModalContainer'

interface IChangesProps {
	project: ProjectDto;
}

export const Changes = ({ project }: IChangesProps) => {
	
	const [openModal, setOpenModal] = useState(false);
	
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
				<p>Или после получения заявки, мы вам перезвоним.</p>
				<Button buttonType={ButtonType.BIG} title='Заполнить заявку' actionHandler={() => setOpenModal(true)} />
				{openModal && <OrderModalContainer setOpen={setOpenModal} title='ваши данные для связи' />}
			</div>
		</section>
	)
}

