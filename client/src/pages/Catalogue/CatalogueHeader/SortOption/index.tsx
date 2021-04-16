import React, { useState } from 'react';
import catalogueSortInfo, { SortDirection } from '../../../../constants/sortData/catalogueSortInfo';

interface Props {
    sortInfoId: string;

//    applySort(search: URLSearchParams): void;
}

const SortOption = ({ sortInfoId }: Props) => {
    const sortInfo = catalogueSortInfo.get(sortInfoId);
    const [direction, setDirection] = useState(sortInfo?.direction);
    if (!sortInfo) return undefined;

    const sortClicked = () => {
        let newDirection;
        if (!direction) {
            newDirection = SortDirection.ASC;
        } else {
            newDirection = (direction === SortDirection.ASC) ?
                (SortDirection.DESC) : (SortDirection.ASC);
        }
        // applySort();
        setDirection(newDirection);

    };

    return <div>
        <div onClick={ () => sortClicked() }> { sortInfo.name } </div>
    </div>;
};

export default SortOption;
