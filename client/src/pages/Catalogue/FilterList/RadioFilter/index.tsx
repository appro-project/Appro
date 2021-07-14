import React, { useState } from 'react';

import classes from '../FilterList.module.scss';
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

    return <div className={ classes['filters-list__item'] }>
        <h3 className={ classes['filters-list__item-header'] }>{ filterInfo.name }</h3>
        <ul className={ classes['filter-list-radio'] }>
            {
                (filterInfo.options as SingleOption[])
                    .map((filterOption, idx) => {
                        const activeClasses = [classes['checkmark']];
                        if (filterOption.isSelected) {
                            activeClasses.push(classes['option_selected']);
                        }

                        return (
                            <li key={ idx }
                                className={ (filterOption.isSelected) ? 'selected' : '' }
                                onClick={ () => optionOnClick(
                                    filterOption,
                                ) }>
                                { filterOption.name }
                                <span className={ activeClasses.join(' ') }/>
                            </li>
                        );
                    },
                ) }
        </ul>
    </div>;
};

export default RadioFilter;
