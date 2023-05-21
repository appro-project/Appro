import React, { memo, useState } from 'react'
import catalogueSortInfo, { SortDirection } from '@/constants/sortData/catalogueSortInfo'

interface Props {
  sortInfoId: string;
  disabled?: boolean;
  handleSort(id: string, direction: SortDirection): void;
}

const SortOption = memo(({ sortInfoId, handleSort, disabled }: Props) => {
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
      <div onClick={!disabled ? () => sortClicked() : () => null}> {sortInfo.name} </div>
    </div>
  );
});

export default SortOption;
