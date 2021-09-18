import React from 'react';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { Link } from 'react-router-dom';

import classes from './Breadcrumbs.module.scss';
import arrow from '../../../assets/img/breadcrumbs/arrow.svg';

const DynamicProjectBreadcrumb = ({ match }: any) => (
  <span>{ match.params.projectId }</span>
);
// todo: duplicates menuLinks
const crumbsInfo = [
  { breadcrumb: 'Главная', path: '/' },
  { breadcrumb: 'Каталог домов', path: '/catalogue' },
  { breadcrumb: 'Индивидуальный проект', path: '/individual-project' },
  { breadcrumb: 'Реализованные проекты', path: '/finished' },
  { breadcrumb: 'Дополнительные услуги', path: '/additional' },
  { breadcrumb: 'О нас', path: '/about' },
  { breadcrumb: 'Каталог', path: '/catalogue' },
  { breadcrumb: DynamicProjectBreadcrumb, path: '/catalogue/:projectId' },
];

const Breadcrumbs = ({ breadcrumbs }: any) => (
  <div  className={classes.Breadcrumbs}>
    { breadcrumbs.map(({ match, breadcrumb }: any) =>
                        <span key={ match.url }>
            <Link to={ match.url }>{ breadcrumb }</Link>
                           <img src={ arrow }/>
      </span>) }
  </div>
);

export default withBreadcrumbs(crumbsInfo)(Breadcrumbs);
