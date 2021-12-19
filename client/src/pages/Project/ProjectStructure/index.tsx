import React from 'react';

import './ProjectStructure.scss';

import sketch_image from '../../../assets/img/project_page/sketch.svg';
import draw_image from '../../../assets/img/project_page/draw.svg';

const ProjectStructure = () => {
  return (
    <section className="project-section project-structure">
      <h3 className="project-section__title project-structure__title">Состав проекта</h3>
      <div className="project-section__text">
        <p>
          Приобретая проект дома в Архитектурном бюро, вы получаете комплект чертежей - 2 экземпляра, необходимый для
          проведения строительных работ и беспрепятственного получения разрешения на строительство.
        </p>
        <p>
          Проект содержит два раздела – Архитектурный, Конструктивный. Инженерный раздел и генеральный план можно
          приобрести дополнительно. Документация выдается в 2-х одинаковых экземплярах, средний размер 1 экземпляра
          проекта 50-70 страниц, формат А4–А3.
        </p>
        <a href="#" className="project-structure__button yellow-button yellow-button_16">
          Посмотреть пример проекта
        </a>
      </div>
      <div className="project-structure__wrapper">
        <div className="illustrated-list">
          <div className="illustrated-list__top">
            <div className="illustrated-list__img">
              <img src={sketch_image} alt="" />
            </div>
            <div className="illustrated-list__title">
              Архитектурный
              <br />
              раздел
            </div>
          </div>
          <ol className="illustrated-list__content">
            <li>Общие данные</li>
            <li>План этажа с расстановкой мебели, экспликация помещений</li>
            <li>Кладочные планы</li>
            <li>План кровли</li>
            <li>Разрезы</li>
            <li>Фасады</li>
            <li>Сечения, узлы, детали</li>
            <li>
              Ведомости полов, оконных и дверных проёмов, ограждающих конструкций, отделки помещений, заполнения проемов
            </li>
          </ol>
        </div>
        <div className="illustrated-list">
          <div className="illustrated-list__top">
            <div className="illustrated-list__img">
              <img src={draw_image} alt="" />
            </div>
            <div className="illustrated-list__title">
              Конструктивный
              <br />
              раздел
            </div>
          </div>
          <ol className="illustrated-list__content">
            <li>План котлована/траншей</li>
            <li>План фундамента</li>
            <li>Сечения фундаментов</li>
            <li>Раскладка блоков</li>
            <li>Плита по ґрунту</li>
            <li>Спецификация расхода стали, материалов и изделий</li>
            <li>План монолитного пояса</li>
            <li>План перекрытий (если 2 этажа и выше)</li>
            <li>Конструкции кровли</li>
            <li> Спецификация элементов кровли</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ProjectStructure;
