import React, { useState } from 'react';

import classes from '../FilterList.module.scss';
import catalogueFiltersInfo, { RangeOption } from '../../../../constants/filterData/catalogueFiltersInfo';
import Button, { ButtonType } from '../../../../components/UI/Button';
import { getNumberFromString } from '../../../../services/util';
interface Props{
    filterId: string;
    initialRange?: {from: string, to: string};
    applyFilter(option: RangeOption): void;
}

const RangeFilter = ({ filterId, initialRange, applyFilter }: Props) => {
    const filterInfo = catalogueFiltersInfo.get(filterId);
    const option = filterInfo?.options as RangeOption;

    const getValidFrom = (fromToValidate: string | undefined) => {
        if (!fromToValidate) return option.minFrom;
        const convertedFrom = getNumberFromString(fromToValidate, option.minFrom);

        return (convertedFrom < option.minFrom) ?
            (option.minFrom) : (convertedFrom);
    };

    const getValidTo = (toToValidate: string | undefined) => {
        if (!toToValidate) return option.maxTo;

        const convertedTo = getNumberFromString(toToValidate, option.maxTo);

        return (convertedTo > option.maxTo) ? (option.maxTo) : (convertedTo);
    };

    const getInitialFrom = () => {
        return (initialRange?.from) ? (String(getValidFrom(initialRange?.from)))
            : (String(option.minFrom));
    };

    const getInitialTo = () => {
        return (initialRange?.to) ? (String(getValidTo(initialRange?.to))) : (String(option.maxTo));
    };

    const [from, setFrom] = useState(getInitialFrom());
    const [to, setTo] = useState(getInitialTo());

    if (!filterInfo) {
        console.warn(`filter info for ${filterId} not found`);

        return <React.Fragment/>;
    }

    const rangeOptionOnClick = () => {
        const validFrom = getValidFrom(from);
        const validTo = getValidTo(to);
        setFrom(String(validFrom));
        setTo(String(validTo));
        const validRange = {
            ...option,
            from: validFrom,
            to: validTo,
        };
        applyFilter(validRange);
    };

    return <div className={ classes['filters-list__item'] }>
        <h3 className={ classes['filters-list__item-header'] }>{ filterInfo.name }</h3>
        <div className={ classes['filters-list__item-range'] }>
            <input onChange={ e => setFrom(e.target.value) }
                   value={ from }/>
            <input onChange={ e => setTo(e.target.value) }
                   value={ to }/>
            <Button title={ 'OK' } buttonType={ ButtonType.TRANSPARENT_SMALL }
                    actionHandler={ () => rangeOptionOnClick() }/>

        </div>
    </div>;
};

export default RangeFilter;
