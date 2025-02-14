import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SortOption from './SortOption'
import { SortDetails, SortDirection } from '@/constants/sortData/catalogueSortInfo'
import { getSortUri } from '@/services/data'
import { useLocation } from 'react-router'
import classes from './CatalogueHeader.module.scss'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'

interface StateProps {
	count: number;
	sortDetails?: SortDetails;

	applySort(search: URLSearchParams): void;
}

export const CatalogueHeader = ({ count, sortDetails, applySort }: StateProps) => {
	const [rotatedItems, setRotatedItems] = useState<{ [key: string]: boolean }>({})

	const toggleRotation = (sortInfoId: string) => {
		setRotatedItems(prev => ({
			...prev,
			[sortInfoId]: !prev[sortInfoId]
		}))
	}

	const location = useLocation()
	// const history = useHistory()

	const handleSort = (id: string, direction: SortDirection) => {
		const currentSearchParams = new URLSearchParams(location.search)
		const currentSearch = currentSearchParams.get(id)

		if (!currentSearch && sortDetails) {
			currentSearchParams.delete(sortDetails.id)
		}
		const searchUri = getSortUri(id, direction, currentSearchParams)

		applySort(searchUri)
		// FIXME: fix me
		// history.push({
		// 	search: decodeURIComponent(searchUri.toString()),
		// 	pathname: location.pathname
		// })
	}

	const getDirectionClass = (id: string) => {
		const activeSortingClassAsc = [
			classes.CatalogueHeader_SortingItem,
			classes.CatalogueHeader_SortingItem__ActiveAsc
		].join(' ')

		const activeSortingClassDesc = [
			classes.CatalogueHeader_SortingItem,
			classes.CatalogueHeader_SortingItem__ActiveDesc
		].join(' ')
		const passiveSortingClass = classes.CatalogueHeader_SortingItem
		if (!sortDetails || sortDetails.id !== id) {
			return passiveSortingClass
		}
		if (sortDetails.direction === SortDirection.ASC) {
			return activeSortingClassAsc
		}
		if (sortDetails.direction === SortDirection.DESC) {
			return activeSortingClassDesc
		}
	}

	const areaClass = getDirectionClass('area_sort')
	const priceClass = getDirectionClass('projectPrice_sort')

    const {t} = useTranslation();


	return (
		<div className={classes.CatalogueHeader}>
			<div className={classes.CatalogueHeader_Found}>
				{t('catalogue.found_projects')} {count}{' '}
			</div>
			<div className={classes.CatalogueHeader_Sorting}>
				<span className={classes.CatalogueHeader_Sorting_Title}>
					{t('catalogue.sorting.title')}{' '}
				</span>
			    <div className={classes.CatalogueHeader_Sorting_Wrapper}> 
					<ul className={classes.CatalogueHeader_SortingItems}>
							<li className={areaClass} onClick={() => toggleRotation("area_sort")}>
							<SortOption sortInfoId={'area_sort'} handleSort={handleSort} />
							<ArrowOutwardIcon className={`${classes.icon} ${rotatedItems["area_sort"] ? classes.rotated : ""}`}/>
						</li>
						<li className={priceClass} onClick={() => toggleRotation("projectPrice_sort")}>
							<SortOption
								sortInfoId={'projectPrice_sort'}
								handleSort={handleSort}
							/>
							<ArrowOutwardIcon className={`${classes.icon} ${rotatedItems["projectPrice_sort"] ? classes.rotated : ""}`}/>
						</li>
					</ul>
			    </div>
		    </div>
				{count === 0 && (
					<div className={classes.found_no_projects}>{t('catalogue.found_no_projects')}</div>
				)}
		</div>
	)
}

