import React from 'react';
import SortOption from './SortOption';
import { SortDirection } from '../../../constants/sortData/catalogueSortInfo';
import { getSortUri } from '../../../services/data';
import { RouteComponentProps, withRouter } from 'react-router';

import classes from './CatalogueHeader.module.scss';

interface StateProps {
  count: number;

  applySort(search: URLSearchParams): void;
}

type Props = StateProps & RouteComponentProps<any>;

const CatalogueHeader = ({ count, applySort, location, history }: Props) => {
  const handleSort = (id: string, direction: SortDirection) => {
    const currentSearchParams = new URLSearchParams(location.search);
    const searchUri = getSortUri(id, direction, currentSearchParams);
    applySort(searchUri);
    history.push({
                   search: decodeURIComponent(searchUri.toString()),
                   pathname: location.pathname,
                 });
  };

  const activeSortingClass
    = [classes.CatalogueHeader_SortingItem, classes.CatalogueHeader_SortingItem__ActiveAsc]
    .join(' ');

  return <div className={ classes.CatalogueHeader }>
    <div className={ classes.CatalogueHeader_Found }> Найдено проектов: { count } </div>
    <div className={ classes.CatalogueHeader_Sorting }>
      <span>Сортировка: </span>
      <ul className={ classes.CatalogueHeader_SortingItems }>
        <li className={ activeSortingClass }>
          <SortOption          sortInfoId={ 'popular_sort' } handleSort={ handleSort }/>
        </li>
        <li className={ classes.CatalogueHeader_SortingItem }>
          <SortOption sortInfoId={ 'area_sort' } handleSort={ handleSort }/>
        </li>
        <li className={ classes.CatalogueHeader_SortingItem }><SortOption
          sortInfoId={ 'price_sort' } handleSort={ handleSort }/>
        </li>
      </ul>
    </div>
  </div>;
};

export default withRouter(CatalogueHeader);
