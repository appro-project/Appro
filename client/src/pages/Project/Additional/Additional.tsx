import { useTranslation } from 'react-i18next'
import './Additional.scss'
import main_plan from '@/assets/img/project_page/main-plan.svg'
import pen from '@/assets/img/project_page/pen.svg'
import paint from '@/assets/img/project_page/paint.svg'
import { Link } from 'react-router-dom'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useModalStore } from '@/modal/order-modal-cantainer.strore'
import ReactPlayer from 'react-player'

export const Additional = () => {
	const { t } = useTranslation();

	const { openModal } = useModalStore();
	const handleOpenModal = () => {
		openModal(null, t('modal.title_contact'));
	};
	
	return (
		<section className='project-section project-additional'>
			<h3 className='project-section__title project-additional__title'>
				{t('additional.title')}
			</h3>
			<div className='project-section__text'>
				<ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
				<p>{t('additional.description')}</p>
				<p>
					{t('additional.for_more_info')}{' '}
					<span  onClick={handleOpenModal} className='project-section__link-to-feedback'>
						{t('additional.or_fill_form')}
					</span>{' '}
					{t('additional.we_contact_you')}
				</p>
			</div>
			<div className='project-additional__wrapper'>
				<div className='illustrated-list'>
					<div className='illustrated-list__top'>
						<div className='illustrated-list__img'>
							<img src={main_plan} alt='' />
						</div>
						<div className='illustrated-list__title'>
							{t('additional.services.general_plan.title')}
						</div>
					</div>
					<ol className='illustrated-list__content project-additional__list'>
						<li>{t('additional.services.general_plan.item1')}</li>
						<li>{t('additional.services.general_plan.item2')}</li>
						<li>{t('additional.services.general_plan.item3')}</li>
						<li>{t('additional.services.general_plan.item4')}</li>
						<li>{t('additional.services.general_plan.item5')}</li>
						<li>{t('additional.services.general_plan.item6')}</li>
						<li>{t('additional.services.general_plan.item7')}</li>
					</ol>
				</div>
				<div className='illustrated-list'>
					<div className='illustrated-list__top'>
						<div className='illustrated-list__img'>
							<img src={pen} alt='' />
						</div>
						<div className='illustrated-list__title'>
							{t('additional.services.engineering_section.title')}
						</div>
					</div>
					<ol className='illustrated-list__content project-additional__list'>
						<li>{t('additional.services.engineering_section.item1')}</li>
						<li>{t('additional.services.engineering_section.item2')}</li>
						<li>{t('additional.services.engineering_section.item3')}</li>
					</ol>
				</div>
				<div className='illustrated-list project-additional__list'>
					<div className='illustrated-list__top'>
						<div className='illustrated-list__img'>
							<img src={paint} alt='' />
						</div>
						<div className='illustrated-list__title'>
							{t('additional.services.interior_design.title')}
						</div>
					</div>
					<ol className='illustrated-list__content project-additional__list'>
						<li>{t('additional.services.interior_design.item1')}</li>
						<li>{t('additional.services.interior_design.item2')}</li>
						<li>{t('additional.services.interior_design.item3')}</li>
						<li>{t('additional.services.interior_design.item4')}</li>
						<li>{t('additional.services.interior_design.item5')}</li>
						<li>{t('additional.services.interior_design.item6')}</li>
						<li>{t('additional.services.interior_design.item7')}</li>
						<li>{t('additional.services.interior_design.item8')}</li>
						<li>{t('additional.services.interior_design.item9')}</li>
					</ol>
				</div>
				<div className='illustrated-list project-additional__list'>
					<div className='illustrated-list__top'>
						<div className='illustrated-list__img'>
							<img src={main_plan} alt='' />
						</div>
						<div className='illustrated-list__title'>
							{t('additional.services.building_intentions.title')}
						</div>
						<Tooltip
							title={
								<Typography fontSize={15}>
									{t('additional.services.building_intentions.passport')}
								</Typography>
							}
							arrow
						>
							<HelpOutlineIcon fontSize='large' />
						</Tooltip>
					</div>
					<ol className='illustrated-list__content project-additional__list'>
						<li>{t('additional.services.building_intentions.item1')}</li>
						<li>{t('additional.services.building_intentions.item2')}</li>
						<li>{t('additional.services.building_intentions.item3')}</li>
						<li>{t('additional.services.building_intentions.item4')}</li>
					</ol>
					<div className='illustrated-list__price'>
						{t('additional.services.price')}
					</div>
				</div>
			</div>
		</section>
	)
}
