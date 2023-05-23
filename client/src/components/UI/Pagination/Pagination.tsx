import { useMemo } from 'react'

import classes from './Pagination.module.scss'

interface Props {
  itemsLength: number;
  currentPage: number;
  itemsPerPage: number;

  onPageChange(nextPage: number): void;
}

export const Pagination = ({ itemsLength, currentPage, itemsPerPage, onPageChange }: Props) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(itemsLength / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const handlePageClick = (event: React.MouseEvent<HTMLLIElement>) => {
    onPageChange(Number(event.currentTarget.id));
  };

  const activePageClass = [classes.Pagination_Item, classes.Pagination_Item__Active].join(' ');
  const renderPageNumbers = useMemo(
    () =>
      pageNumbers.map((number) => {
        return (
          // TODO [sunny]: Add Pagination_Item__Active when on page
          <li
            className={number === currentPage ? activePageClass : classes.Pagination_Item}
            key={number}
            id={String(number)}
            onClick={(event) => handlePageClick(event)}
          >
            {number}
          </li>
        );
      }),
    [pageNumbers],
  );

  return (
    <div className={classes.Pagination}>
      <ul className={classes.Pagination_List}>{renderPageNumbers}</ul>
    </div>
  );
};

