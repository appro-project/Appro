import React, { useState } from 'react';

import classes from '../FilterList.module.scss';
import catalogueFiltersInfo, {
    SingleOption,
} from '../../../../constants/filterData/catalogueFiltersInfo';

interface Props {
    filterId: string;
    initialOptions?: string[];
    applyFilter(option: SingleOption): void;
}

const CheckboxFilter = ({ filterId, initialOptions, applyFilter }: Props) => {
    const filterInfo = catalogueFiltersInfo.get(filterId);

    const getInitialState = () => {
        if (!filterInfo) return [];
        const defaultOptions = filterInfo.options as SingleOption[];
        if (initialOptions) {
            for (const defaultOption of defaultOptions) {
                if (initialOptions.indexOf(defaultOption.id) > -1) {
                    defaultOption.isSelected = true;
                }
            }
        }

        return defaultOptions.filter(o => o.isSelected).map(o => o.id);
    };

    const [options, setOptions] =
        useState(getInitialState());

    if (!filterInfo) {
        console.warn(`filter info for ${filterId} not found`);

        return <React.Fragment/>;
    }

    const optionOnClick = (clickedOption: SingleOption) => {
        const currentOptions = options;
        const clickedOptionId = currentOptions.indexOf(clickedOption.id);
        if (clickedOptionId > -1) {
            currentOptions.splice(clickedOptionId, 1);
            clickedOption.isSelected = false;
        }else {
            currentOptions.push(clickedOption.id);
            clickedOption.isSelected = true;
        }

        setOptions([...currentOptions]);
        applyFilter(clickedOption);
    };

    return <div className={ classes['filters-list__item'] }>
        <h3 className={ classes['filters-list__item-header'] } >{ filterInfo.name }</h3>
        <ul className={ classes['filter-list__checkbox'] }>
            {
                (filterInfo.options as SingleOption[])
                    .map((filterOption, idx) => {
                        return (
                            <li key={ idx }
                                className={ (filterOption.isSelected) ? 'option_selected' : '' }
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

export default CheckboxFilter;
