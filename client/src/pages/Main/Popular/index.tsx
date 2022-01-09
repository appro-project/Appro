import React from 'react';

import Container from '../../../containers/hoc/Container';
import PopularCategory from './PopularCategory';

import classes from './Popular.module.scss';
import { PopularCategoryData } from '../../../entity/PopularCategoryData';

interface PropsType {
  popularCategories: PopularCategoryData[];
}

const Popular = ({ popularCategories }: PropsType) => {
  return (
    <section id={'popular-category'} className={classes['popularCategories']}>
      <Container>
        <div className={classes['popular-categories__container']}>
          <div className={classes['popular-categories__title']}>Популярные категории</div>

          <div className={classes['popular-categories__items']}>
            {popularCategories.map((category, index) => (
              <PopularCategory categoryData={category} key={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Popular;
