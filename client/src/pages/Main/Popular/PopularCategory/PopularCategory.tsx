import classes from './PopularCategory.module.scss'
import { Overlay } from '@/components/UI/Overlay/Overlay'
import { PopularCategoryData } from '@/entity/PopularCategoryData'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface Props {
	categoryData: PopularCategoryData
}

export const PopularCategory = ({ categoryData }: Props) => {
	const { t } = useTranslation()

	return (
		<Link to={categoryData.link} className={classes['popular-category']} onClick={() => window.scrollTo({ top: 0 })}>
			<div className={classes['popular-category__body']}>
				<div className={classes['popular-category__img-wrapper']}>
					<img src={categoryData.image} alt='' />
					<Overlay />
				</div>
				<div className={classes['popular-category__title']}>
					{t(categoryData.title)}
				</div>
			</div>
		</Link>
	)
}
