import React from 'react';
import SortOption from './SortOption';
import { SortDirection, SortDetails } from '../../../constants/sortData/catalogueSortInfo';
import { getSortUri } from '../../../services/data';
import { RouteComponentProps, useHistory, withRouter, useLocation } from 'react-router';
import classes from './CatalogueHeader.module.scss';

interface StateProps {
  count: number;
  sortDetails?: SortDetails;
  applySort(search: URLSearchParams): void;
}

const CatalogueHeader = ({ count, sortDetails, applySort }: StateProps) => {
  const location = useLocation();
  const history = useHistory();

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
        <span>Сортировка: </span>
        <ul className={classes.CatalogueHeader_SortingItems}>
          <li className={popularityClass}>
            <SortOption sortInfoId={'popularity_sort'} handleSort={handleSort} />
          </li>
          <li className={areaClass}>
            <SortOption sortInfoId={'area_sort'} handleSort={handleSort} />
          </li>
          <li className={priceClass}>
            <SortOption sortInfoId={'projectPrice_sort'} handleSort={handleSort} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CatalogueHeader;
