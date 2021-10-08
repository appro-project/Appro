import React, { Component } from 'react';

import classes from './Pagination.module.scss';

interface Props {
  items: any[];
  currentPage: number;
  itemsPerPage: number;

  onPageChange(nextPage: number): void;
}

class Pagination extends Component<Props, {}> {
  render() {
    const { items, itemsPerPage } = this.props;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i += 1) {
      pageNumbers.push(i);
    }

    const activePageClass = [classes.Pagination_Item, classes.Pagination_Item__Active].join(' ');
    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        // TODO [sunny]: Add Pagination_Item__Active when on page
        <li
          className={ (number === this.props.currentPage) ?
            activePageClass : (classes.Pagination_Item) }
          key={ number }
          id={ String(number) }
          onClick={ event => this.handlePageClick(event) }
        >
          { number }
        </li>
      );
    });

    return <div className={ classes.Pagination }>
      <ul className={ classes.Pagination_List }>{ renderPageNumbers }</ul>
    </div>;
  }

  handlePageClick(event: React.MouseEvent<HTMLLIElement>) {
    this.props.onPageChange(Number(event.currentTarget.id));
  }
}

export default Pagination;
