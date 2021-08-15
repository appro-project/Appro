import { FilterType, RangeOption, SearchOption } from '../../constants/filterData/catalogueFiltersInfo';
import { SortDirection } from '../../constants/sortData/catalogueSortInfo';
import { ProjectPreviewDetails } from '../../entity/ProjectPreviewDetails';
import projectsData from '../../mock/catalogueProjectsData';

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

const getProjectsByFilters = (filters: URLSearchParams)
    : ProjectPreviewDetails[] => {
    let currentProjects = [...projectsData, ...projectsData];
    filters.forEach((value, key) => {
        if (key.includes('_sort')) {
            return;
        }
        currentProjects = currentProjects.filter((pr) => {
            if (value.includes('-') && !value.includes('floor')) {
                const range = value.split('-');

                // @ts-ignore
                return pr[key] >= range[0] && pr[key] <= range[1];
            }
            const values = value.split(',');
            if (values.includes('all')) {
                return pr;
            }
            for (const v of values) {
                // @ts-ignore
                if (String(pr[key]) === String(v)) {
                    return true;
                }
                if (v.includes('>')) {
                    const moreThan = v.split('>')[1];
                    // @ts-ignore
                    if (Number(pr[key]) >= Number(moreThan)) {
                        return true;
                    }
                }
            }

            return false;
        });
    });

    return currentProjects;
};

const sortProjectsByParams = (projects: ProjectPreviewDetails[], searchParams: URLSearchParams)
    : ProjectPreviewDetails[] => {
    let currentProjects = projects;
    searchParams.forEach((value, key) => {
        if (!key.includes('sort')) {
            return;
        }
        currentProjects = currentProjects.sort((pr1, pr2) => {
                // @ts-ignore
                const prKey = key.split('_sort')[0];
                // @ts-ignore
                if (pr1[prKey] < pr2[prKey]) {
                    return (value === 'asc') ? (-1) : 1;
                }
                // @ts-ignore
                if (pr1[prKey] > pr2[prKey]) {
                    return (value === 'asc') ? 1 : (-1);
                }

                return 0;
            });

    });

    return projects;

};

export { getSearchUri, getSortUri, getProjectsByFilters, sortProjectsByParams };
