import React from 'react';

import Container from '../../../containers/hoc/Container';
import PopularCategory from './PopularCategory';

import classes from './Popular.module.scss';
import mansardaImg from 'assets/img/popular/mansarda.jpg';
import oneFloorImg from 'assets/img/popular/one_floor.jpg';
import twoFloorImg from 'assets/img/popular/two_floor.jpg';
import modernImage from 'assets/img/popular/modern.jpg';
import classicImage from 'assets/img/popular/classic.jpg';
import smallImage from 'assets/img/popular/150.jpg';
import mediumImage from 'assets/img/popular/150_250.jpg';
import largeImage from 'assets/img/popular/250.jpg';

export interface PopularCategoryData {
    image: string;
    title: string;
}

const popularCategories: PopularCategoryData[] = [
    { image: mansardaImg, title: 'Дома с мансардой' },
    { image: oneFloorImg, title: 'Одноэтажные дома' },
    { image: twoFloorImg, title: 'Двухэтажные дома' },
    { image: modernImage, title: 'Cовременные дома' },
    { image: classicImage, title: 'Классические дома' },
    { image: smallImage, title: 'Дома до 150 м' },
    { image: mediumImage, title: 'Дома от 150 до 250м' },
    { image: largeImage, title: 'Дома от 250 м' },
];

const Popular = () => {
    return <section className={ classes['popularCategories'] }>
        <Container>
            <div className={ classes['popular-categories__container'] }>
                <div className={ classes['popular-categories__title'] }>
                    Популярные категории
                </div>

                <div className={ classes['popular-categories__items'] }>
                    { popularCategories.map((category, index) =>
                        <PopularCategory categoryData={ category } key={ index }/>,
                    ) }
                </div>
            </div>
        </Container>
    </section>;
};

export default Popular;
