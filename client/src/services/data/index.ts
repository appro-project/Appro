import { FilterType, RangeOption, SearchOption } from '../../constants/filterData/catalogueFiltersInfo';
import { SortDirection } from '../../constants/sortData/catalogueSortInfo';

const getSearchUri = (searchOption: SearchOption,
                      isChecked: boolean,
                      currentSearchParams: URLSearchParams): URLSearchParams => {
    const { id, value, type } = searchOption;

// todo: simplify...
    if (isChecked) {
        if (type === FilterType.CHECKBOX) {
            const existingValue = currentSearchParams.get(id);
            if (existingValue) {
                currentSearchParams.set(id, `${ existingValue },${ value }`);
            } else {
                currentSearchParams.set(id, `${value}`);
            }
        } else if (type === FilterType.RADIO) {
            currentSearchParams.set(id, `${value}`);
        }else if (type === FilterType.RANGE) {
            const filterRange = value as RangeOption;
            currentSearchParams.set(id, `${filterRange.from}-${filterRange.to}`);
        }
    } else {
        if (type === FilterType.CHECKBOX) {
            const existingValue = currentSearchParams.get(id);
            if (existingValue) {
                const newValueList = existingValue.split(',').filter(v => v !== value);
                if (newValueList.length === 0) {
                    currentSearchParams.delete(id);
                } else {
                    const newValue = newValueList.join(',');
                    currentSearchParams.set(id, newValue);
                }
            } else {
                console.warn("Should not happen. If value was checked it's in the search list");
            }
        }
    }

    return currentSearchParams;
};

const getSortUri = (id: string,
                    direction: SortDirection,
                    currentSearchParams: URLSearchParams): URLSearchParams => {
    currentSearchParams.set(id, direction.valueOf());

    return currentSearchParams;
};

export { getSearchUri, getSortUri };
