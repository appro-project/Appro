import classes from './ProjectLayout.module.scss'

import { ImageCarousel } from '../ImageCarousel/ImageCarousel'
import { Project } from '@/entity/Project'
import { NumericFormat } from 'react-number-format'
import '../Additional/Additional.scss'
import {ProjectDto} from "@/api/model";

import { useTranslation } from 'react-i18next'

interface Props {
  project: ProjectDto;
}

export const ProjectLayout = (props: Props) => {
  const project = props.project;

  const floorImages = props.project.floors
    .filter((f) => f.planningImage !== null)
    .map((f) => f.planningImage.path);

  const floors = project.floors.filter((f) => !(f.isBasement || f.isAttic));

  const {t} = useTranslation();

  return (
		<section className={classes.ProjectLayout}>
			<div className={'project-section__title project-additional__title'}>
				{t('project.layout.title')}
			</div>
			<div className={classes.ProjectLayout_Wrapper}>
				<div className={classes.ProjectLayout_Slider}>
					<ImageCarousel images={floorImages} />
				</div>

				<div className={classes.ProjectLayout_Info}>
					<div className={classes.ProjectLayout_Attention}>
						{t('project.layout.change_attention')}{' '}
						<a href='tel:+380663953654'>+38 (066) 39-53-654</a>
					</div>
					<ul className={classes.ProjectLayout_InfoList}>
						<li className={classes.ProjectLayout_InfoItem}>
							<span>{t('project.layout.general_area')}</span>
							<b>{project.generalArea} м2</b>
						</li>
						{floors.map(f => (
							<li key={f.index} className={classes.ProjectLayout_InfoItem}>
								<span>
									{t('project.layout.floor_area', { index: f.index })}
								</span>
								<b>{f.area} м2</b>
							</li>
						))}

						<li className={classes.ProjectLayout_InfoItem}>
							<span>{t('project.layout.living_area')}</span>
							<b>{project.livingArea} м2</b>
						</li>
						<li className={classes.ProjectLayout_InfoItem}>
							<span>{t('project.layout.building_area')}</span>
							<b>{project.buildingArea} м2</b>
						</li>
						{project.terraceArea && project.terraceArea > 0 && (
							<li className={classes.ProjectLayout_InfoItem}>
								<span>{t('project.layout.terrace_area')}</span>
								<b>{project.terraceArea} м2</b>
							</li>
						)}
						<li className={classes.ProjectLayout_InfoItem}>
							<span>{t('project.layout.dimensions')}</span>
							<b>
								{project.width} х {project.length} м
							</b>
						</li>
						{floors.map(f => (
							<li key={f.index} className={classes.ProjectLayout_InfoItem}>
								<span>
									{t('project.layout.floor_height', { index: f.index })}
								</span>
								<b>{f.height}</b>
							</li>
						))}

						<li className={classes.ProjectLayout_InfoItem}>
							<span>{t('project.layout.walls')}</span>
							<b>
								{t(`options.wall-material.${project.wallMaterial.toLowerCase()}`)} {project.wallThickness} мм +
								{t(`options.insulation.${project.insulation.toLowerCase()}`)} {project.insulationThickness} мм
							</b>
						</li>
						<li className={classes.ProjectLayout_InfoItem}>
							<span>{t('project.layout.foundation')}</span>
							<b>
								{t(`options.foundation.${project.foundation.toLowerCase()}`)}
							</b>
						</li>
						<li className={classes.ProjectLayout_InfoItem}>
							<span>{t('project.layout.ceilings')}</span>
							<b>{t(`options.ceiling.${project.ceiling.toLowerCase()}`)}</b>
						</li>
						<li className={classes.ProjectLayout_InfoItem}>
							<span>{t('project.layout.roof')}</span>
							<b>{t(`options.roof.${project.roof.toLowerCase()}`)}</b>
						</li>
						<li
							className={[
								classes.ProjectLayout_InfoItem,
								classes.ProjectLayout_InfoItem_24
							].join(' ')}
						>
							<span>{t('project.layout.construction_price')}</span>
							<b>
								≈{' '}
								<NumericFormat
									value={project.buildingPrice}
									displayType={'text'}
									thousandSeparator={' '}
									suffix={' грн'}
								/>
							</b>
						</li>
					</ul>
				</div>
			</div>
		</section>
	)
};

