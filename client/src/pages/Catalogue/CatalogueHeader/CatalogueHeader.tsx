import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {SortDetails, SortDirection} from '@/constants/sortData/catalogueSortInfo'
import {getSortUri} from '@/services/data'
import {useLocation, useNavigate} from 'react-router'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'

interface StateProps {
    count: number
    sortDetails?: SortDetails

    applySort(search: URLSearchParams): void
}

export const CatalogueHeader = ({count, sortDetails, applySort}: StateProps) => {
    const {t} = useTranslation()
    const [rotatedItems, setRotatedItems] = useState<{ [key: string]: boolean }>({})
    const location = useLocation()
    const navigate = useNavigate()

    const toggleRotation = (sortInfoId: string) => {
        setRotatedItems(prev => ({
            ...prev,
            [sortInfoId]: !prev[sortInfoId]
        }))

        handleSort(sortInfoId, rotatedItems[sortInfoId] ? SortDirection.ASC : SortDirection.DESC)
    }

    const handleSort = (id: string, direction: SortDirection) => {
        const currentSearchParams = new URLSearchParams(location.search)
        const currentSearch = currentSearchParams.get(id)

        // If there's an active sort param, remove it before setting a new one
        if (!currentSearch && sortDetails) {
            currentSearchParams.delete(sortDetails.id)
        }

        const searchUri = getSortUri(id, direction, currentSearchParams)
        applySort(searchUri)

        navigate({
            search: decodeURIComponent(searchUri.toString()),
            pathname: location.pathname
        })
    }

    /**
     * Decide if a sort option is active (and which direction)
     * so we can slightly change styles if needed.
     */
    const getSortItemClasses = (id: string) => {
        return 'ml-5 min-w-[190px] cursor-pointer leading-5 py-3 px-5 bg-[#ffb000] border-2 border-[#ffb000] rounded-[7px] ' +
            'flex justify-center items-center gap-[5px] hover:bg-[#ffb072] transition-colors hover:border-[#ffb000]'
    }

    /**
     * Arrow rotation classes
     * (rotate-0 vs. rotate-90, etc.)
     */
    const getIconClasses = (id: string) => {
        const isRotated = rotatedItems[id]
        // We rotate from 90 to 0 degrees, matching your SCSS logic
        // (transform: rotate(90deg) => is default, rotate(0deg) => rotated)
        return `text-[22px] transition-transform transform ${
            isRotated ? 'rotate-0' : 'rotate-90'
        }`
    }

    return (
        <div className="w-full">
            {/*
        "Found" projects:
        Hidden for smaller screens (shown at xl and above)
      */}
            <div className="hidden xl:block font-montserrat font-medium text-2xl uppercase text-black">
                {t('catalogue.found_projects')} {count}{' '}
            </div>

            {/* Sorting Block */}
            <div
                className="
          relative max-w-[calc(100vw-30px)]
          mt-6 mb-[30px]
          flex flex-col items-center
          font-montserrat font-medium
          text-base leading-[43px] md:flex-row
        "
            >
        <span className="text-base mr-2 md:mr-4 mb-2 md:mb-0">
          {t('catalogue.sorting.title')}{' '}
        </span>

                <div className="relative inline-block">
                    <ul
                        className="flex flex-col   md:flex-row  min-h-[43px] min-w-[190px]  items-center gap-[7px]"
                    >
                        {/* Area Sort */}
                        <li
                            className={getSortItemClasses('area_sort')}
                            onClick={() => toggleRotation('area_sort')}
                        >
                            {t('catalogue.sorting.area')}
                            <ArrowOutwardIcon className={getIconClasses('area_sort')}/>
                        </li>

                        {/* Price Sort */}
                        <li
                            className={getSortItemClasses('projectPrice_sort')}
                            onClick={() => toggleRotation('projectPrice_sort')}
                        >
                            {t('catalogue.sorting.price')}
                            <ArrowOutwardIcon className={getIconClasses('projectPrice_sort')}/>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Ï
        Show "No projects found" only if count === 0.
        Visible on smaller screens (hidden at xl and above).
      */}
            {count === 0 && (
                <div
                    className="   block xl:hidden      text-[15px] font-montserrat font-medium  uppercase text-black text-center   pt-[30px] "
                >
                    {t('catalogue.found_no_projects')}
                </div>
            )}
        </div>
    )
}
