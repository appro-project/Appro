import { Button } from '@/components/UI/Button/Button'
import classes from './ProjectDetails.module.scss'
import { Link } from 'react-router-dom'
import {ProjectDto} from "@/api/model";
import {FC} from "react";
import { useTranslation } from 'react-i18next';
import { getDescription } from '@/pages/Project/utils';

interface Props {
  project: ProjectDto;
}

export const ProjectDetails:FC<Props> = ({project}) => {

  const {t} = useTranslation();

  return (
		<div className={classes['project-details']}>
			<div className={classes['project-details__header']}>
				<div className={classes['project-details__title']}>
					{t('catalogue.form.project_name')} {project.title}
				</div>

				{/*TODO: Fix square*/}
				<div className={classes['project-details__square']}>
					{project.livingArea} м<sup>2</sup>
				</div>
			</div>
			<div className={classes['project-details__description']}>
				{getDescription(project)}
			</div>

			<div className={classes['project-details__footer']}>
				<div className={classes['project-details__price']}>
					{project.projectPrice} грн.
					<span className={classes['project-details__price-info']}>
						{t('catalogue.project.price')}
					</span>
				</div>
				<Link
					to={`/catalogue/${project.id}`}
					className={classes['project-details__link']}
				>
					<Button title={t('catalogue.project.more_details')} />
				</Link>
			</div>
		</div>
	)
};

