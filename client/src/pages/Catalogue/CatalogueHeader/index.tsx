import React from 'react';
import SortOption from './SortOption';
import { SortDirection, SortDetails } from '../../../constants/sortData/catalogueSortInfo';
import { getSortUri } from '../../../services/data';
import { RouteComponentProps, withRouter } from 'react-router';

import classes from './CatalogueHeader.module.scss';

interface StateProps {
  count: number;
  sortDetails?: SortDetails;
  applySort(search: URLSearchParams): void;
}

type Props = StateProps & RouteComponentProps<any>;

class CatalogueHeader extends React.PureComponent<Props, {}>  {

  handleSort = (id: string, direction: SortDirection) => {
    const currentSearchParams = new URLSearchParams(this.props.location.search);
    const currentSearch = currentSearchParams.get(id);
    if (!currentSearch && this.props.sortDetails) {
      currentSearchParams.delete(this.props.sortDetails.id);
    }
    const searchUri = getSortUri(id, direction, currentSearchParams);
    this.props.applySort(searchUri);
    this.props.history.push({
                   search: decodeURIComponent(searchUri.toString()),
                   pathname: this.props.location.pathname,
                 });
  }

render() {
  const { count } = this.props;
  const popularityClass = this.getDirectionClass('popularity_sort');
  const areaClass = this.getDirectionClass('area_sort');
  const priceClass = this.getDirectionClass('projectPrice_sort');

    return <div className={ classes.CatalogueHeader } >
      <div className={ classes.CatalogueHeader_Found }> Найдено проектов: { count } </div>
      <div className={ classes.CatalogueHeader_Sorting }>
        <span>Сортировка: </span>
        <ul className={ classes.CatalogueHeader_SortingItems }>
          <li className={ popularityClass  }>
            <SortOption  sortInfoId={ 'popularity_sort' } handleSort={ this.handleSort }/>
          </li>
          <li className={ areaClass }>
            <SortOption sortInfoId={ 'area_sort' } handleSort={ this.handleSort }/>
          </li>
          <li className={ priceClass }><SortOption
              sortInfoId={ 'projectPrice_sort' } handleSort={ this.handleSort }/>
          </li>
        </ul>
      </div>
    </div >;
  }

  private getDirectionClass(id: string) {
    const { sortDetails } = this.props;
    const activeSortingClassAsc
        = [classes.CatalogueHeader_SortingItem, classes.CatalogueHeader_SortingItem__ActiveAsc]
        .join(' ');

    const activeSortingClassDesc
        = [classes.CatalogueHeader_SortingItem, classes.CatalogueHeader_SortingItem__ActiveDesc]
        .join(' ');
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
  }
}

export default withRouter(CatalogueHeader);
