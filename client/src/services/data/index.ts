import { FilterType, RangeOption, SearchOption } from '../../constants/filterData/catalogueFiltersInfo';

const getSearchUri = (searchOption: SearchOption,
                      isChecked: boolean,
                      searchParams: URLSearchParams): string => {
    const { name, value, type } = searchOption;

// todo: simplify...
    if (isChecked) {
        if (type === FilterType.CHECKBOX) {
            const existingValue = searchParams.get(name);
            if (existingValue) {
                searchParams.set(name, `${ existingValue },${ value }`);
            } else {
                searchParams.set(name, JSON.stringify(value));
            }
        } else if (type === FilterType.RADIO) {
            searchParams.set(name, JSON.stringify(value));
        }else if (type === FilterType.RANGE) {
            const filterRange = value as RangeOption;
            searchParams.set(name, `${filterRange.from}-${filterRange.to}`);
        }
    } else {
        if (type === FilterType.CHECKBOX) {
            const existingValue = searchParams.get(name);
            if (existingValue) {
                const newValueList = existingValue.split(',').filter(v => v !== value);
                if (newValueList.length === 0) {
                    searchParams.delete(name);
                } else {
                    const newValue = newValueList.join(',');
                    searchParams.set(name, newValue);
                }
            } else {
                console.warn("Should not happen. If value was checked it's in the search list");
            }
        }
    }

    return decodeURIComponent(searchParams.toString());
};

export { getSearchUri };
