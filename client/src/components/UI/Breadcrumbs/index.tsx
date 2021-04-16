import React from 'react';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { Link } from 'react-router-dom';

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
    { breadcrumb: DynamicProjectBreadcrumb, path: '/catalogue/:projectId' },
];

const Breadcrumbs = ({ breadcrumbs }: any) => (
    <React.Fragment>
        { breadcrumbs.map(({ match, breadcrumb }: any) =>
            <span key={ match.url }>
            <Link to={ match.url }>{ breadcrumb }</Link>
                <span> / </span>
      </span>) }
    </React.Fragment>
);

export default withBreadcrumbs(crumbsInfo)(Breadcrumbs);
