import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

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
import { ProjectDto } from '@/api/model'

export const AboutUs = () => {
	const projects = useSelector(getViewProjects)
	const { t } = useTranslation()

	return (
		<section>
			<Container>
				<section className='project-section about-main'>
					<h3 className='project-section__title about-main__title'>
						{t('about_us.title')}
					</h3>
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
								<p>{t('about_us.paragraph1')}</p>
								<p>{t('about_us.paragraph2')}</p>
								<p>{t('about_us.paragraph3')}</p>
							</div>
						</div>
					</div>
				</section>

				<section className='project-section about-team'>
					<h3 className='project-section__title about-team__title'>
						{t('about_us.team.title')}
					</h3>
					<div className='about-team__list'>
						<div className='team-member'>
							<div className='team-member__image'>
								<img src={member_1} alt='' />
							</div>
							<div className='team-member__name'>
								{t('about_us.team.member1.name')}
							</div>
							<div className='team-member__position'>
								{t('about_us.team.member1.position')}
							</div>
							<div className='team-member__description'>
								{t('about_us.team.member1.description')}
							</div>
						</div>
						<div className='team-member'>
							<div className='team-member__image'>
								<img src={member_2} alt='' />
							</div>
							<div className='team-member__name'>
								{t('about_us.team.member2.name')}
							</div>
							<div className='team-member__position'>
								{t('about_us.team.member2.position')}
							</div>
							<div className='team-member__description'>
								{t('about_us.team.member2.description')}
							</div>
						</div>
						<div className='team-member'>
							<div className='team-member__image'>
								<img src={member_3} alt='' />
							</div>
							<div className='team-member__name'>
								{t('about_us.team.member3.name')}
							</div>
							<div className='team-member__position'>
								{t('about_us.team.member3.position')}
							</div>
							<div className='team-member__description'>
								{t('about_us.team.member3.description')}
							</div>
						</div>
						<div className='team-member'>
							<div className='team-member__image'>
								<img src={member_4} alt='' />
							</div>
							<div className='team-member__name'>
								{t('about_us.team.member4.name')}
							</div>
							<div className='team-member__position'>
								{t('about_us.team.member4.position')}
							</div>
							<div className='team-member__description'>
								{t('about_us.team.member4.description')}
							</div>
						</div>
					</div>
				</section>

				<section className='project-section project-more'>
					<h3 className='project-section__title'>
						{t('about_us.similar_projects.title')}
					</h3>
					<div className={classesVisited['visited-projects__items']}>
						{projects
							.filter((x, index) => index < 3)
							.map((project: ProjectDto, idx: number) => (
								<div
									className={classes.VisitedProjects_ProjectWrapper}
									key={idx}
								>
									<ProjectDetails projectData={project} />
								</div>
							))}
					</div>
				</section>
			</Container>
		</section>
	)
}
