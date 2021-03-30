import React from 'react';
import classes from './FilterList.module.scss';
import {
    CatalogueFilterInfo,
    FilterType,
    RangeOption, SearchOption,
    SingleOption,
} from '../../../constants/filterData/catalogueFiltersInfo';

interface Props {
    filters: CatalogueFilterInfo[];
    applyFilter(searchOption: SearchOption, isChecked: boolean): void;
}

const FilterList = ({ filters, applyFilter }: Props) => {

    const handleSearchOption = (filterId: string, filterOptionUri: string,
                                filterType: FilterType) => {
        const searchOption = {
            id: filterId,
            value: filterOptionUri,
            type: filterType,
        };

        // todo: map!
        const currentFilter = filters.find(cf => cf.id === filterId);

        let isChecked = false;
        for (const fo of currentFilter?.options as SingleOption[]) {
            if (fo.uri === filterOptionUri) {
                // todo: why changing props works?!
                isChecked = fo.isSelected = !fo.isSelected;
                break;
            }
        }

        applyFilter(searchOption, isChecked);
    };

    const renderList = (filterName: string, filterType: FilterType,
                        filterOptions: SingleOption[]) => {

        return (
            <ul className={ classes[`filter-list__${ filterType.valueOf() }`] }>
                {
                    filterOptions.map((filterOption, idx) => {
                            return (
                                <li key={ idx }
                                    onClick={ () => handleSearchOption(
                                        filterName,
                                        filterOption.uri,
                                        filterType,
                                    ) }>
                                    { filterOption.name }
                                </li>
                            );
                        },
                    ) }
            </ul>
        );
    };

    const handleRangeOption = (filterId: string,
                               filterRange: {rangeFrom: number | null, rangeTo: number | null},
    ) => {
        const { rangeFrom, rangeTo } = filterRange;

        const currentFilter = filters
            .find(cf => cf.id === filterId); // doesn't work for objects
        if (!currentFilter) {
            console.warn(`filter ${ filterId } is not in state`);

            return;
        }
        const options = (currentFilter.options as RangeOption);
        // todo: validate min > max
        if (rangeFrom) {
            options.from = (rangeFrom < options.minFrom) ? (options.minFrom) : rangeFrom;
        } else if (rangeTo) {
            options.to = (rangeTo > options.maxTo) ? (options.maxTo) : rangeTo;
        }
        const searchOption = {
            id: currentFilter.id,
            value: options,
            type: currentFilter.filterType,
        };

        applyFilter(searchOption, true);
    };

    const renderRange = (filterName: string, filterRange: RangeOption) => {
        return <div>
            <input onChange={ e => handleRangeOption(filterName,
                                                     {
                    rangeFrom: parseInt(e.target.value, 10),
                    rangeTo: null,
                }) }
                   value={ filterRange.from }/>
            <input onChange={ e => handleRangeOption(filterName,
                                                     {
                    rangeFrom: null,
                    rangeTo: parseInt(e.target.value, 10),
                }) }
                   value={ filterRange.to }/>
        </div>;
    };

    const renderFilterItem = (filterInfo: CatalogueFilterInfo) => {
        switch (filterInfo.filterType) {
            case FilterType.CHECKBOX: {
                return <React.Fragment>
                    <h3>{ filterInfo.name }</h3>
                    { renderList(filterInfo.id,
                                 filterInfo.filterType,
                                 filterInfo.options as SingleOption[]) }
                </React.Fragment>;
            }
            case FilterType.RADIO: {
                return <React.Fragment>
                    <h3>{ filterInfo.name }</h3>
                    { renderList(filterInfo.id,
                                 filterInfo.filterType,
                                 filterInfo.options as SingleOption[]) }
                </React.Fragment>;
            }
            case FilterType.RANGE: {
                return <React.Fragment>
                    <h3>{ filterInfo.name }</h3>
                    { renderRange(filterInfo.id, filterInfo.options as RangeOption) }
                </React.Fragment>;
            }
            default: {
                console.error('Invalid filter type. This should never happen');

                return <div/>;
            }
        }
    };

    return <div>
        <div className={ classes['filters-list__items'] }>
            { filters.map((filterInfo: CatalogueFilterInfo, idx: number) =>
                renderFilterItem(filterInfo)) }
        </div>
        ;

    </div>;
};

export default FilterList;
