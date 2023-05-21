import withBreadcrumbs from 'react-router-breadcrumbs-hoc'
import { Link } from 'react-router-dom'
import classes from './Breadcrumbs.module.scss'
import arrow from '@/assets/img/breadcrumbs/arrow.svg'
import { menuLinks } from '@/constants'
import { useSelector } from 'react-redux'
import { getProjects } from '@/redux/selectors'

const DynamicProjectBreadcrumb = ({ match }: any) => {
  const projects = useSelector(getProjects);
  const findProject = projects.find((x) => x.id === +match.params.projectId);
  return <span>{findProject?.title}</span>;
};

const crumbsInfo = [
  ...menuLinks.map((x) => ({ breadcrumb: x.name, path: x.path })),
  { breadcrumb: DynamicProjectBreadcrumb, path: '/catalogue/:projectId' },
];

const Breadcrumbs = ({ breadcrumbs }: any) => (
  <div className={classes.Breadcrumbs}>
    {breadcrumbs.map(({ match, breadcrumb }: any) => (
      <span key={match.url}>
        <Link to={match.url}>{breadcrumb}</Link>
        <img src={arrow} />
      </span>
    ))}
  </div>
);

export default withBreadcrumbs(crumbsInfo)(Breadcrumbs);
