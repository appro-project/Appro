import React from 'react';
import SortOption from './SortOption';

interface Props {
    count: number;
    applySort(search: URLSearchParams): void;
}

const CatalogueHeader = ({ count, applySort }: Props) => {
    return (
        <div>
            <div> { count } </div>
            { /*<SortOption sortInfoId={ 'popular_sort' }/>*/ }
        </div>
);
};

export default CatalogueHeader;
