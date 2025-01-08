import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './Changes.scss'
import project_modification from '@/assets/img/project_page/project-modification.jpg'
import { Button, ButtonType } from '@/components/UI/Button/Button'
import { ProjectDto } from '@/api/model'
import { OrderModalContainer } from '@/modal/OrderModalContainer'
import { useLocation } from 'react-router-dom'
import { currentHost } from '@/services/server-data'

interface IChangesProps {
	project: ProjectDto
}

export const Changes = ({ project }: IChangesProps) => {
  	const { t } = useTranslation()
	
	const [openModal, setOpenModal] = useState(false);

	const location = useLocation();
  	const projectLink = currentHost + location.pathname;
	
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
				<Button buttonType={ButtonType.BIG} title={t('catalogue.changes.button_title')} actionHandler={() => setOpenModal(true)} />
				{openModal && <OrderModalContainer 
									project={projectLink}
									setOpen={setOpenModal} 
									title='ваши данные для связи' />}
			</div>
		</section>
	)
}
