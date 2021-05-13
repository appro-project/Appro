import React from 'react';
import SortOption from './SortOption';
import { SortDirection } from '../../../constants/sortData/catalogueSortInfo';
import { getSortUri } from '../../../services/data';
import { RouteComponentProps, withRouter } from 'react-router';

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

    return <div>
            <div> Найдено проектов: { count } </div>
            <div>
                <span>Сортировка: </span>
                <SortOption sortInfoId={ 'popular_sort' } handleSort={ handleSort }/>
                <SortOption sortInfoId={ 'area_sort' } handleSort={ handleSort }/>
                <SortOption sortInfoId={ 'price_sort' } handleSort={ handleSort }/>
            </div>
        </div>;
};

export default withRouter(CatalogueHeader);
