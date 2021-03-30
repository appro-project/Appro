import { FilterType, RangeOption, SearchOption } from '../../constants/filterData/catalogueFiltersInfo';

const getSearchUri = (searchOption: SearchOption,
                      isChecked: boolean,
                      searchParams: URLSearchParams): string => {
    const { id, value, type } = searchOption;

// todo: simplify...
    if (isChecked) {
        if (type === FilterType.CHECKBOX) {
            const existingValue = searchParams.get(id);
            if (existingValue) {
                searchParams.set(id, `${ existingValue },${ value }`);
            } else {
                searchParams.set(id, `${value}`);
            }
        } else if (type === FilterType.RADIO) {
            searchParams.set(id, `${value}`);
        }else if (type === FilterType.RANGE) {
            const filterRange = value as RangeOption;
            searchParams.set(id, `${filterRange.from}-${filterRange.to}`);
        }
    } else {
        if (type === FilterType.CHECKBOX) {
            const existingValue = searchParams.get(id);
            if (existingValue) {
                const newValueList = existingValue.split(',').filter(v => v !== value);
                if (newValueList.length === 0) {
                    searchParams.delete(id);
                } else {
                    const newValue = newValueList.join(',');
                    searchParams.set(id, newValue);
                }
            } else {
                console.warn("Should not happen. If value was checked it's in the search list");
            }
        }
    }

    return decodeURIComponent(searchParams.toString());
};

export { getSearchUri };
