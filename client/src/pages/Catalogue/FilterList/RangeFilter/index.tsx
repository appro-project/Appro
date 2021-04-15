import React, { useState } from 'react';

import classes from './RangeFilter.module.scss';
import catalogueFiltersInfo, { RangeOption } from '../../../../constants/filterData/catalogueFiltersInfo';
import Button from '../../../../components/UI/Button';
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
        return (initialRange?.from) ? (getValidFrom(initialRange?.from)) : (String(option.minFrom));
    };

    const getInitialTo = () => {
        return (initialRange?.to) ? (getValidTo(initialRange?.to)) : (String(option.maxTo));
    };

    const [from, setFrom] = useState(getInitialFrom());
    const [to, setTo] = useState(getInitialTo());

    if (!filterInfo) {
        console.warn(`filter info for ${filterId} not found`);

        return <React.Fragment/>;
    }

    const rangeOptionOnClick = () => {
        const validFrom = getValidFrom(initialRange?.from);
        const validTo = getValidTo(initialRange?.to);
        setFrom(String(validFrom));
        setTo(String(validTo));
        const validRange = {
            ...option,
            from: validFrom,
            to: validTo,
        };
        applyFilter(validRange);
    };

    return <div>
        <h3>{ filterInfo.name }</h3>
        <div>
            <input onChange={ e => setFrom(e.target.value) }
                   value={ from }/>
            <input onChange={ e => setTo(e.target.value) }
                   value={ to }/>
            <Button title={ 'OK' }
                    actionHandler={ () => rangeOptionOnClick() }/>

        </div>;
    </div>;
};

export default RangeFilter;
