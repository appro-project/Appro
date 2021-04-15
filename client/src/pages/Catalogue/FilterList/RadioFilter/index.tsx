import React, { useState } from 'react';

import classes from './RadioFilter.module.scss';
import catalogueFiltersInfo, { SingleOption } from '../../../../constants/filterData/catalogueFiltersInfo';
interface Props{
    filterId: string;
    initialOption?: string;
    applyFilter(option: SingleOption): void;
}

const RadioFilter = ({ filterId, initialOption, applyFilter }: Props) => {
    const filterInfo = catalogueFiltersInfo.get(filterId);

    const getInitialState = () => {
        if (!filterInfo) return undefined;
        const defaultOptions = filterInfo.options as SingleOption[];
        if (!initialOption) return defaultOptions.find(op => op.isSelected)?.id;

        return defaultOptions.find(op => op.id = initialOption)?.id;

    };

    const [option, setOption] =
        useState(getInitialState());

    if (!filterInfo) {
        console.warn(`filter info for ${filterId} not found`);

        return <React.Fragment/>;
    }

    const optionOnClick = (clickedOption: SingleOption) => {
        if (clickedOption.id !== option) {
            setOption(clickedOption.id);
            clickedOption.isSelected = true;
            applyFilter(clickedOption);
        }
    };

    return <div>
        <h3>{ filterInfo.name }</h3>
        <ul className={ classes['filter-list__checkbox'] }>
            {
                (filterInfo.options as SingleOption[])
                    .map((filterOption, idx) => {
                        return (
                            <li key={ idx }
                                className={ (filterOption.isSelected) ? 'selected' : '' }
                                onClick={ () => optionOnClick(
                                    filterOption,
                                ) }>
                                { filterOption.name }
                            </li>
                        );
                    },
                ) }
        </ul>
    </div>;
};

export default RadioFilter;
