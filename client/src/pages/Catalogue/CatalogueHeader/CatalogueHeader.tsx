import React, { useEffect, useState } from 'react'
import SortOption from './SortOption'
import { SortDetails, SortDirection } from '@/constants/sortData/catalogueSortInfo'
import { getSortUri } from '@/services/data'
import { useLocation } from 'react-router'
import classes from './CatalogueHeader.module.scss'

interface StateProps {
  count: number;
  sortDetails?: SortDetails;
  applySort(search: URLSearchParams): void;
}

const CatalogueHeader = ({ count, sortDetails, applySort }: StateProps) => {
  const location = useLocation();
  const history = useHistory();
  const [openMobileFilter, setOpenMobileFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState(true);

  useEffect(() => {
    if (window.screen.width < 1440) {
      setOpenMobileFilter(true);
      setOpenFilter(false);
    } else {
      setOpenMobileFilter(false);
      setOpenFilter(true);
    }
  }, [document.documentElement.clientWidth]);

  const handleSort = (id: string, direction: SortDirection) => {
    const currentSearchParams = new URLSearchParams(location.search);
    const currentSearch = currentSearchParams.get(id);

    if (!currentSearch && sortDetails) {
      currentSearchParams.delete(sortDetails.id);
    }
    const searchUri = getSortUri(id, direction, currentSearchParams);

    applySort(searchUri);
    history.push({
      search: decodeURIComponent(searchUri.toString()),
      pathname: location.pathname,
    });
  };

  const getDirectionClass = (id: string) => {
    const activeSortingClassAsc = [
      classes.CatalogueHeader_SortingItem,
      classes.CatalogueHeader_SortingItem__ActiveAsc,
    ].join(' ');

    const activeSortingClassDesc = [
      classes.CatalogueHeader_SortingItem,
      classes.CatalogueHeader_SortingItem__ActiveDesc,
    ].join(' ');
    const passiveSortingClass = classes.CatalogueHeader_SortingItem;
    if (!sortDetails || sortDetails.id !== id) {
      return passiveSortingClass;
    }
    if (sortDetails.direction === SortDirection.ASC) {
      return activeSortingClassAsc;
    }
    if (sortDetails.direction === SortDirection.DESC) {
      return activeSortingClassDesc;
    }
  };

  const popularityClass = getDirectionClass('popularity_sort');
  const areaClass = getDirectionClass('area_sort');
  const priceClass = getDirectionClass('projectPrice_sort');

  return (
    <div className={classes.CatalogueHeader}>
      <div className={classes.CatalogueHeader_Found}> Найдено проектов: {count} </div>
      <div className={classes.CatalogueHeader_Sorting}>
        <span className={classes.CatalogueHeader_Sorting_Title}>Сортировка: </span>
        {openMobileFilter && (
          <div className={popularityClass} onClick={() => setOpenFilter(!openFilter)}>
            <SortOption disabled sortInfoId={'popularity_sort'} handleSort={handleSort} />
            <img
              src="data:image/svg+xml,%3Csvg width='10' height='7' viewBox='0 0 10 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 7L5 0L10 7H0Z' fill='%23202020'/%3E%3C/svg%3E%0A"
              alt=""
            />
          </div>
        )}
        {openFilter && (
          <ul className={classes.CatalogueHeader_SortingItems}>
            <li className={popularityClass}>
              <SortOption sortInfoId={'popularity_sort'} handleSort={handleSort} />
              <img
                src="data:image/svg+xml,%3Csvg width='10' height='7' viewBox='0 0 10 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 7L5 0L10 7H0Z' fill='%23202020'/%3E%3C/svg%3E%0A"
                alt=""
              />
            </li>
            <li className={areaClass}>
              <SortOption sortInfoId={'area_sort'} handleSort={handleSort} />
              <img
                src="data:image/svg+xml,%3Csvg width='10' height='7' viewBox='0 0 10 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 7L5 0L10 7H0Z' fill='%23202020'/%3E%3C/svg%3E%0A"
                alt=""
              />
            </li>
            <li className={priceClass}>
              <SortOption sortInfoId={'projectPrice_sort'} handleSort={handleSort} />
              <img
                src="data:image/svg+xml,%3Csvg width='10' height='7' viewBox='0 0 10 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 7L5 0L10 7H0Z' fill='%23202020'/%3E%3C/svg%3E%0A"
                alt=""
              />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default CatalogueHeader;
