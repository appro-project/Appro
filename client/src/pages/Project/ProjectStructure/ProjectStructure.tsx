
import './ProjectStructure.scss'

import sketch_image from '@/assets/img/project_page/sketch.svg'
import draw_image from '@/assets/img/project_page/draw.svg'
import { Project } from '@/entity/Project'
import { InfoCard } from '../GeneralInfo/InfoCard'
import {ProjectDto} from "@/api/model";

import { useTranslation } from 'react-i18next'

interface Props {
  project: ProjectDto;
}

export const ProjectStructure = ({ project }: Props) => {
  const {t} = useTranslation();

  return (
		<section className='project-section project-structure'>
			<h3 className='project-section__title project-structure__title'>
				{t('project.composition.title')}
			</h3>
			<div className='project-section__container'>
				<div>
					<div className='project-section__text'>
						<p>{t('project.composition.description1')}</p>
						<p>{t('project.composition.description2')}</p>
						<a
							href='/example-project'
							className='project-structure__button yellow-button yellow-button_16'
						>
							{t('project.composition.view_project_button')}
						</a>
					</div>
					<div className='project-structure__wrapper'>
						<div className='illustrated-list'>
							<div className='illustrated-list__top'>
								<div className='illustrated-list__img'>
									<img src={sketch_image} alt='' />
								</div>
								<div className='illustrated-list__title'>
									{t('project.architectural_section.title')}
								</div>
							</div>
							<ol className='illustrated-list__content'>
								<li>{t('project.architectural_section.item1')}</li>
								<li>{t('project.architectural_section.item2')}</li>
								<li>{t('project.architectural_section.item3')}</li>
								<li>{t('project.architectural_section.item4')}</li>
								<li>{t('project.architectural_section.item5')}</li>
								<li>{t('project.architectural_section.item6')}</li>
								<li>{t('project.architectural_section.item7')}</li>
								<li>{t('project.architectural_section.item8')}</li>
							</ol>
						</div>
						<div className='illustrated-list'>
							<div className='illustrated-list__top'>
								<div className='illustrated-list__img'>
									<img src={draw_image} alt='' />
								</div>
								<div className='illustrated-list__title'>
									{t('project.structural_section.title')}
								</div>
							</div>
							<ol className='illustrated-list__content'>
								<li>{t('project.structural_section.item1')}</li>
								<li>{t('project.structural_section.item2')}</li>
								<li>{t('project.structural_section.item3')}</li>
								<li>{t('project.structural_section.item4')}</li>
								<li>{t('project.structural_section.item5')}</li>
								<li>{t('project.structural_section.item6')}</li>
								<li>{t('project.structural_section.item7')}</li>
								<li>{t('project.structural_section.item8')}</li>
								<li>{t('project.structural_section.item9')}</li>
								<li>{t('project.structural_section.item10')}</li>
							</ol>
						</div>
					</div>
				</div>
				<InfoCard
					title={project.title}
					generalArea={project.generalArea}
					projectPrice={project.projectPrice}
					timeToCreate={project.timeToCreate}
				/>
			</div>
		</section>
	)
};

