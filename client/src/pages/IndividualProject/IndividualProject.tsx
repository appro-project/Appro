import { useTranslation } from 'react-i18next'
import classes from './IndividualProject.module.scss'
import { Container } from '@/containers/hoc/Container/Container'
import { Differences } from './Differences/Differences'
import { Steps } from './Steps/Steps'
import { Order } from './Order/Order'
import { VisitedProjects } from '@/containers/VisitedProjects/VisitedProjects'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs/Breadcrumbs'

export const IndividualProject = () => {
  const {t} = useTranslation();
  return (
		<div className={classes.IndividualProject}>
			<Container>
				<div className={classes.IndividualProject_Breadcrumbs}>
					<Breadcrumbs />
				</div>
				<div className={classes['individual-project__header']}>
					{t('individual.title')}
				</div>
				<p className={classes['individual-project__description']}>
					{t('individual.description')}
				</p>

				<div className={classes['individual-project__differences-wrapper']}>
					<Differences />
				</div>

				<p className={classes['individual-project__description']}>
					{t('individual.paragraph1')}
				</p>
				<p className={classes['individual-project__description']}>
					{t('individual.paragraph2')}
				</p>
				<p className={classes['individual-project__description']}>
					{t('individual.paragraph3')}
				</p>

				<div className={classes['individual-project__steps-wrapper']}>
					<Steps />
				</div>

				<div className={classes['individual-project__order-wrapper']}>
					<Order />
				</div>
			</Container>
			{/* Kind of page Footer, should be out of container */}
			<div className={classes['individual-project__visited-wrapper']}>
				<Container>
					<VisitedProjects />
				</Container>
			</div>
		</div>
	)
};
