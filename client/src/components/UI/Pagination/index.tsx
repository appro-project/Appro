import React, { Component } from 'react';
interface Props{
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

        const renderPageNumbers = pageNumbers.map((number) => {
            return (
                <li
                    key={ number }
                    id={ String(number) }
                    onClick={ event => this.handlePageClick(event) }
                >
                    { number }
                </li>
            );
        });

        return <ul>{ renderPageNumbers }</ul>;
    }

    handlePageClick(event: React.MouseEvent<HTMLLIElement>) {
        this.props.onPageChange(Number(event.currentTarget.id));
    }
}

export default Pagination;
