import React, { useState } from 'react';
import classes from './CatalogueFilters.module.scss';
import catalogueFiltersInfo, {
    CatalogueFilterInfo, defaultSearchOptions,
    FilterType,
    RangeOption, SearchOption,
    SingleOption,
} from '../../../constants/filterData/catalogueFiltersInfo';

interface Props {
    applyFilter(searchOption: SearchOption, isChecked: boolean): void;
}

const CatalogueFilters = ({ applyFilter }: Props) => {
    const data = [...catalogueFiltersInfo];

    const [searchOptions] = useState(defaultSearchOptions);

    const handleSearchOption = (filterName: string, uri: string, filterType: FilterType) => {
        const searchOption = {
            name: filterName,
            value: uri,
            type: filterType,
        };

        const searchOptionIndex = searchOptions.findIndex(so => so.name === filterName);
        const isChecked = (searchOptionIndex > -1);
        if (isChecked) {
            searchOptions.splice(searchOptionIndex, 1);
        } else {
            searchOptions.push(searchOption);
        }

        applyFilter(searchOption, !isChecked);
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

    const handleRangeOption = (filterName: string,
                               filterRange: {rangeFrom: number | null, rangeTo: number | null},
                               ) => {
        const { rangeFrom, rangeTo } = filterRange;

        let currentSearchOption = searchOptions
            .find(so => so.name === filterName); // doesn't work for objects
        if (currentSearchOption) {
            if (rangeFrom) {
                (currentSearchOption.value as RangeOption).from = rangeFrom;
            }else if (rangeTo) {
                (currentSearchOption.value as RangeOption).to = rangeTo;
            }
        } else {
            currentSearchOption = {
                name: filterName,
                value: { from: rangeFrom || 0, to: rangeTo || -1 },
                type: FilterType.RANGE,
            };
            searchOptions.push(currentSearchOption);
        }

        applyFilter(currentSearchOption, true);
    };

    const renderRange = (filterName: string, filterRange: RangeOption) => {
        console.log(filterName, filterRange);

        return <div>
            <input onChange={ e => handleRangeOption(filterName,
                                                     { rangeFrom: parseInt(e.target.value, 10),
                                                         rangeTo: null }) }
                   value={ filterRange.from }/>
            <input onChange={ e => handleRangeOption(filterName,
                                                     { rangeFrom:null,
                    rangeTo:  parseInt(e.target.value, 10) }) }
                   value={ filterRange.to }/>
        </div>;
    };

    const renderFilterItem = (filterInfo: CatalogueFilterInfo) => {
        switch (filterInfo.filterType) {
            case FilterType.CHECKBOX: {
                return <React.Fragment>
                    <h3>{ filterInfo.name }</h3>
                    { renderList(filterInfo.uriParam,
                                 filterInfo.filterType,
                                 filterInfo.options as SingleOption[]) }
                </React.Fragment>;
            }
            case FilterType.RADIO: {
                return <React.Fragment>
                    <h3>{ filterInfo.name }</h3>
                    { renderList(filterInfo.uriParam,
                                 filterInfo.filterType,
                                 filterInfo.options as SingleOption[]) }
                </React.Fragment>;
            }
            case FilterType.RANGE: {
                return <React.Fragment>
                    <h3>{ filterInfo.name }</h3>
                    { renderRange(filterInfo.uriParam, filterInfo.options as RangeOption) }
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
            { data.map((filterInfo: CatalogueFilterInfo, idx: number) =>
                renderFilterItem(filterInfo)) }
        </div>
        ;

    </div>;
};

export default CatalogueFilters;
