import React, { useState } from 'react';
import catalogueSortInfo, { SortDirection } from '../../../../constants/sortData/catalogueSortInfo';

interface Props {
  sortInfoId: string;

  handleSort(id: string, direction: SortDirection): void;
}

const SortOption = React.memo(({ sortInfoId, handleSort }: Props) => {
  const sortInfo = catalogueSortInfo.get(sortInfoId);
  const [direction, setDirection] = useState(sortInfo?.direction);
  if (!sortInfo) return <React.Fragment />;

  const sortClicked = () => {
    let newDirection;
    if (!direction) {
      newDirection = SortDirection.ASC;
    } else {
      newDirection = direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    }

    handleSort(sortInfoId, newDirection);
    setDirection(newDirection);
  };

  return (
    <div>
      <div onClick={() => sortClicked()}> {sortInfo.name} </div>
    </div>
  );
});

export default SortOption;
