import React from 'react';
import Container from '../../../containers/hoc/Container';

import classes from './Principles.module.scss';

import benefitImage from 'assets/img/main/principles/benefit.jpg';
import beautyImage from 'assets/img/main/principles/beauty.jpg';
import strengthImage from 'assets/img/main/principles/strength.jpg';
import PrincipleItem from './PrincipleItem';

export interface PrincipleItemData {
    backgroundUrl: string;
    title: string;
    description: string;
}

const principlesData: PrincipleItemData[] = [
    {
        title: 'Польза',
        description: 'Каждый квадратный метр площади должен нести функциональную нагруку, быть рационально задействоваными для выполнения определенных функций, возложенных на помещение, здание, комплекс.',
        backgroundUrl: benefitImage,
    },
    {
        title: 'Прочность',
        description: 'Долговечность здания определяется характеристиками используемых материалов. Крепкие и надёжные конструкции здания - гарантия долговечности.',
        backgroundUrl: strengthImage,
    },
    {
        title: 'Красота',
        description: 'Самый ответственный критерий, отвечающий за визуальное восприятие, гармоничный симбиоз функциональности и конструктивной стороны с формированием определенного стиля.',
        backgroundUrl: beautyImage,
    },

];

const Principles = () => {
    return <section className={ classes.principles }>
        <Container>
            <div className={ classes.principles__container }>
                <div className={ classes.principles__title }>
                    Наши принципы
                </div>

                <div className={ classes.principles__body }>

                    { principlesData.map((principle, index) =>
                        <PrincipleItem key={ index } principleItem={ principle }/>,
                    ) }

                </div>
            </div>
        </Container>
    </section>;
};

export default Principles;
