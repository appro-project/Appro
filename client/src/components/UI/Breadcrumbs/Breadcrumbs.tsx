import useBreadcrumbs from 'use-react-router-breadcrumbs'
import classes from './Breadcrumbs.module.scss'
import { menuLinks } from '@/constants'
import { Link } from 'react-router-dom'
import arrow from '@/assets/img/breadcrumbs/arrow.svg'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const createRoutes = (title: string) => {
	const {t} = useTranslation();
	return [
		...menuLinks.map(x => ({ breadcrumb: t(x.name), path: x.path })),
		{
			element: <span>{title}</span>,
			path: '/catalogue/:projectId',
			breadcrumb: title
		}
	]
}

interface BreadcrumbsProps {
	title?: string
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ title }) => {
	const breadcrumbs = useBreadcrumbs(createRoutes(title))
	return (
		<div className={classes.Breadcrumbs}>
			{breadcrumbs.map(({ match, breadcrumb }: any) => (
				<span key={match.url}>
					<Link to={match.pathname}>{breadcrumb}</Link>
					<img src={arrow} />
				</span>
			))}
		</div>
	)
}
