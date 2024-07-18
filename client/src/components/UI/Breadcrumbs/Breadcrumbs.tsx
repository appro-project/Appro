import useBreadcrumbs from 'use-react-router-breadcrumbs'
import classes from './Breadcrumbs.module.scss'
import {menuLinks} from '@/constants'
import {useSelector} from 'react-redux'
import {getProjects} from '@/redux/selectors'
import {Link} from 'react-router-dom'
import arrow from '@/assets/img/breadcrumbs/arrow.svg'
import {useGetAllProjects} from "@/api/useGetAllProjects";

const DynamicProjectBreadcrumb = ({match}: any) => {
    const {data:projects} = useGetAllProjects();
    const findProject = projects.find((x) => x.id === +match.params.projectId)
    return <span>{findProject?.title}</span>
}

const routes = [
    ...menuLinks.map((x) => ({breadcrumb: x.name, path: x.path})),
    {breadcrumb: DynamicProjectBreadcrumb, path: '/catalogue/:projectId'}
]

export const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs(routes)
    return (<div className={classes.Breadcrumbs}>
        {breadcrumbs.map(({match, breadcrumb}: any) => (
            <span key={match.url}>
		    	<Link to={match.pathname}>{breadcrumb}</Link>
		    <img src={arrow}/>
		  </span>
        ))}
    </div>)
}
