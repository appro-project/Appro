
import classes from './ProjectDetails.module.scss'
import { Project } from '@/entity/Project'
import  {Button, ButtonType } from '@/components/UI/Button/Button'
import { Link } from 'react-router-dom'
import { FC, memo } from 'react'
import {ProjectDto} from "@/api/model";
import { useTranslation } from 'react-i18next'

interface ProjectDetailsProps {
  projectData: ProjectDto;
}

export const ProjectDetails: FC<ProjectDetailsProps> = memo(({projectData}) => {
  const onClick = () => {
    window.scrollTo(0, 200);
  };

  const {t} = useTranslation();

  return (
		<Link
			onClick={onClick}
			to={`/catalogue/${projectData.id}`}
			className={classes['project-details']}
		>
			<div className={classes['project-details__content']}>
				<div className={classes['project-details__img']}>
					<img src={projectData.mainImage?.path} alt={projectData.id + ''} />
				</div>
				<div className={classes['project-details__info']}>
					{/*<span>{ projectData.title }</span>*/}
					<div className={classes['project-details__info-text']}>
						{projectData.title}
						<span>
							<br />
							{t('catalogue.project.name')}
						</span>
					</div>

					<div className={classes['project-details__info-text']}>
						{projectData.generalArea} м<sup>2</sup>
						<span>
							<br />
							{t('catalogue.project.area')}
						</span>
					</div>

					<div className={classes['project-details__info-text']}>
						{projectData.projectPrice} грн.
						<span>
							<br />
							{t('catalogue.project.price')}
						</span>
					</div>
					<div className={classes['project-details__details-button']}>
						<Button
							title={t('catalogue.project.more_details')}
							buttonType={ButtonType.SMALL}
						/>
					</div>
				</div>
			</div>
		</Link>
	)
});
