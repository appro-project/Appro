import React from 'react';
import './Additional.scss';
import main_plan from '../../../assets/img/project_page/main-plan.svg';
import pen from '../../../assets/img/project_page/pen.svg';
import paint from '../../../assets/img/project_page/paint.svg';
import { HashLink as Link } from 'react-router-hash-link';

const Additional = () => {
  return (
    <section className="project-section project-additional">
      <h3 className="project-section__title project-additional__title">Дополнительные услуги</h3>
      <div className="project-section__text">
        <p>Любой проект, помимо основного состава, может быть дополнен по вашему желанию и нуждам.</p>
        <p>
          Для уточнения стоимости дополнительных услуг, позвоните по номеру +38 (066) 39-53-654 или{' '}
          <Link to="/#feedback-form" className="project-section__link-to-feedback">
            заполните форму обратной связи
          </Link>{' '}
          и мы свяжемся с вами.
        </p>
      </div>
      <div className="project-additional__wrapper">
        <div className="illustrated-list">
          <div className="illustrated-list__top">
            <div className="illustrated-list__img">
              <img src={main_plan} alt="" />
            </div>
            <div className="illustrated-list__title">
              Генеральный
              <br />
              план
            </div>
          </div>
          <ol className="illustrated-list__content project-additional__list">
            <li>Схема генерального плана, М1:500</li>
            <li>План благоустройства</li>
            <li>План озеленения</li>
            <li>План наружного освещения территории</li>
            <li>Схема ограждения территории, детали ограждения</li>
            <li>Вертикальная планировка</li>
            <li>Ведомость объёмов перемещения масс</li>
          </ol>
        </div>
        <div className="illustrated-list">
          <div className="illustrated-list__top">
            <div className="illustrated-list__img">
              <img src={pen} alt="" />
            </div>
            <div className="illustrated-list__title">
              Инженерный
              <br />
              раздел
            </div>
          </div>
          <ol className="illustrated-list__content project-additional__list">
            <li>Отопление и вентиляция</li>
            <li>Вода и канализация</li>
            <li>Электрика и освещение</li>
          </ol>
        </div>
        <div className="illustrated-list project-additional__list">
          <div className="illustrated-list__top">
            <div className="illustrated-list__img">
              <img src={paint} alt="" />
            </div>
            <div className="illustrated-list__title">
              Дизайн
              <br />
              проекта интерьера
            </div>
          </div>
          <ol className="illustrated-list__content project-additional__list">
            <li>План розташування меблів та обладнання</li>
            <li>Специфікація меблів та обладнання</li>
            <li>План стелі та підлоги</li>
            <li>План стінових декорів та декорів стелі</li>
            <li>Вузли та деталі</li>
            <li>План розташування та специфікація освітлення</li>
            <li>Схема розміщення вимикачів, розеток</li>
            <li>Розгортки приміщень</li>
            <li>Відомості опорядження приміщень (вказана площа матеріалів)</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Additional;
