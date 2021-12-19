import React from 'react';
import classes from './ProjectLayout.module.scss';

import ImageCarousel from '../ImageCarousel';
import { Project } from '../../../entity/Project';
import NumberFormat from 'react-number-format';

interface Props {
  project: Project;
}

const ProjectLayout = (props: Props) => {
  const project = props.project;

  const floorImages = props.project.floorList
    .filter((f) => f.planningImage !== null)
    .map((f) => f.planningImage) as string[];

  console.log(props);
  console.log(floorImages);

  const floors = project.floorList.filter((f) => !(f.isBasement || f.isAttic));

  return (
    <section className={classes.ProjectLayout}>
      <div className={classes.ProjectLayout_Header}>Планировка</div>
      <div className={classes.ProjectLayout_Wrapper}>
        <div className={classes.ProjectLayout_Slider}>
          <ImageCarousel images={floorImages} />
        </div>

        <div className={classes.ProjectLayout_Info}>
          <div className={classes.ProjectLayout_Attention}>
            Внести изменения в проект и узнать финальную стоимость можно по телефону{' '}
            <a href="tel:+380663953654">+38 (066) 39-53-654</a>
          </div>
          <ul className={classes.ProjectLayout_InfoList}>
            <li className={classes.ProjectLayout_InfoItem}>
              <span>общая площадь</span>
              <b>{project.generalArea} м2</b>
            </li>
            {floors.map((f) => (
              <li key={f.index} className={classes.ProjectLayout_InfoItem}>
                <span>{`площадь ${f.index}-го этажа`}</span>
                <b>{f.area} м2</b>
              </li>
            ))}

            <li className={classes.ProjectLayout_InfoItem}>
              <span>жилая площадь</span>
              <b>{project.livingArea} м2</b>
            </li>
            <li className={classes.ProjectLayout_InfoItem}>
              <span>площадь застройки</span>
              <b>{project.buildingArea} м2</b>
            </li>
            <li className={classes.ProjectLayout_InfoItem}>
              <span>габариты</span>
              <b>
                {project.width} х {project.length} м
              </b>
            </li>
            {floors.map((f) => (
              <li key={f.index} className={classes.ProjectLayout_InfoItem}>
                <span>{`высота ${f.index} этажа`}</span>
                <b>{f.height}</b>
              </li>
            ))}

            <li className={classes.ProjectLayout_InfoItem}>
              <span>стены</span>
              <b>
                {project.wallMaterial} {project.wallThickness} мм +{project.insulation} {project.insulationThickness} мм
              </b>
            </li>
            <li className={classes.ProjectLayout_InfoItem}>
              <span>фундамент</span>
              <b>{project.foundation}</b>
            </li>
            <li className={classes.ProjectLayout_InfoItem}>
              <span>перекрытия</span>
              <b>{project.ceiling}</b>
            </li>
            <li className={classes.ProjectLayout_InfoItem}>
              <span>кровля</span>
              <b>{project.roof}</b>
            </li>
            <li className={[classes.ProjectLayout_InfoItem, classes.ProjectLayout_InfoItem_24].join(' ')}>
              <span>цена строительства</span>
              <b>
                ≈{' '}
                <NumberFormat
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
  );
};

export default ProjectLayout;
