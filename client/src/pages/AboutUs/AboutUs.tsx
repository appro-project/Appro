import { useSelector } from 'react-redux'

import { Container } from '@/containers/hoc/Container/Container'
import about_main_1 from '@/assets/img/aboutUs/about-main-1.jpg'
import classesVisited from '@/containers/VisitedProjects/VisitedProjects.module.scss'
import classes from '@/containers/VisitedProjects/VisitedProjects.module.scss'
import about_main_2 from '@/assets/img/aboutUs/about-main-2.jpg'
import member_1 from '@/assets/img/aboutUs/member-1.jpg'
import member_2 from '@/assets/img/aboutUs/member-2.jpg'
import member_3 from '@/assets/img/aboutUs/member-3.jpg'
import member_4 from '@/assets/img/aboutUs/member-4.jpg'
import './AboutUs.scss'
import { Project } from '@/entity/Project'
import { ProjectDetails } from '@/containers/ProjectDetails/ProjectDetails'
import { getViewProjects } from '@/redux/selectors'
import {ProjectDto} from "@/api/model";

export const AboutUs = () => {
	const projects = useSelector(getViewProjects)

	return (
		<section>
			<Container>
				<section className='project-section about-main'>
					<h3 className='project-section__title about-main__title'>О нас</h3>
					<div className='project-section__wrapper'>
						<div className='about-main__left'>
							<div className='about-main__image'>
								<img src={about_main_1} alt='' />
							</div>
							<div className='about-main__image about-main__image_certificate'>
								<img src={about_main_2} alt='' />
							</div>
						</div>
						<div className='about-main__right'>
							<div className='about-main__info'>
								<p>
									Наш основной профиль в проектировании - это разработка проектов жилых домов. Эта узконаправленная
									область проектирования выбрана потому, что в ней мы отлично разбираемся.
								</p>

								<p>
									Благодаря разработке дизайна интерьеров параллельно с проектированием дома, в мельчайших деталях
									прорабатываешь планировочные решения с расстановкой мебели и ссылками на реальные модели мебели и
									оборудования.
								</p>

								<p>
									Авторское сопровождение объектов, которое является обязательным условием, позволяет реализовывать наши
									проекты в жизнь.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className='project-section about-team'>
					<h3 className='project-section__title about-team__title'>Команда</h3>
					<div className='about-team__list'>
						<div className='team-member'>
							<div className='team-member__image'>
								<img src={member_1} alt='' />
							</div>
							<div className='team-member__name'>Александр Прокопенко</div>
							<div className='team-member__position'>главный архитектор</div>
							<div className='team-member__description'>
								Закончил Приднепровскую академию строительства и архитектуры (ПГАСА). С 1998 г архитектурная
								деятельность.
							</div>
						</div>
						<div className='team-member'>
							<div className='team-member__image'>
								<img src={member_2} alt='' />
							</div>
							<div className='team-member__name'>Артем Тусузян</div>
							<div className='team-member__position'>ведущий архитектор</div>
							<div className='team-member__description'>
								Закончил Киевский государственный технический университет строительства и архитектуры. С 2006 г
								архитектурная деятельность.
							</div>
						</div>
						<div className='team-member'>
							<div className='team-member__image'>
								<img src={member_3} alt='' />
							</div>
							<div className='team-member__name'>Михаил Сагулинн</div>
							<div className='team-member__position'>ведущий архитектор</div>
							<div className='team-member__description'>
								Закончил Киевский государственный технический университет строительства и архитектуры. С 2002 г
								архитектурная деятельность.
							</div>
						</div>
						<div className='team-member'>
							<div className='team-member__image'>
								<img src={member_4} alt='' />
							</div>
							<div className='team-member__name'>Екатерина Шинкаренко</div>
							<div className='team-member__position'>архитектор</div>
							<div className='team-member__description'>
								Закончила Киевский государственный университет строительства и архитектуры. С 2013 г архитектурная
								деятельность.
							</div>
						</div>
					</div>
				</section>

				<section className='project-section project-more'>
					<h3 className='project-section__title'>Похожие проекты</h3>
					<div className={classesVisited['visited-projects__items']}>
						{projects
							.filter((x, index) => index < 3)
							.map((project: ProjectDto, idx: number) => (
								<div className={classes.VisitedProjects_ProjectWrapper} key={idx}>
									<ProjectDetails projectData={project} />
								</div>
							))}
					</div>
				</section>
			</Container>
		</section>
	)
}
