import React from 'react'
import classes from './PopularCategory.module.scss'
import Overlay from '@/components/UI/Overlay/Overlay'
import { PopularCategoryData } from '@/entity/PopularCategoryData'
import { Link } from 'react-router-dom'

interface Props {
  categoryData: PopularCategoryData;
}

const PopularCategory = ({ categoryData }: Props) => {
  return (
    <Link to={categoryData.link} className={classes['popular-category']}>
      <div className={classes['popular-category__body']}>
        <div className={classes['popular-category__img-wrapper']}>
          <img src={categoryData.image} alt="" />
          <Overlay />
        </div>
        <div className={classes['popular-category__title']}>{categoryData.title}</div>
      </div>
    </Link>
  );
};

export default PopularCategory;
