import { FilterType, RangeOption, SearchOption } from '../../constants/filterData/catalogueFiltersInfo';
import { SortDirection } from '../../constants/sortData/catalogueSortInfo';
import { Project } from '../../entity/Project';

const getSearchUri = (
  searchOption: SearchOption,
  isChecked: boolean,
  currentSearchParams: URLSearchParams,
): URLSearchParams => {
  const { id, value, type } = searchOption;

  // todo: simplify...
  if (isChecked) {
    if (type === FilterType.CHECKBOX) {
      const existingValue = currentSearchParams.get(id);
      if (existingValue) {
        currentSearchParams.set(id, `${existingValue},${value}`);
      } else {
        currentSearchParams.set(id, `${value}`);
      }
    } else if (type === FilterType.RADIO) {
      currentSearchParams.set(id, `${value}`);
    } else if (type === FilterType.RANGE) {
      const filterRange = value as RangeOption;
      currentSearchParams.set(id, `${filterRange.from}-${filterRange.to}`);
    }
  } else {
    if (type === FilterType.CHECKBOX) {
      const existingValue = currentSearchParams.get(id);
      if (existingValue) {
        const newValueList = existingValue.split(',').filter((v) => v !== value);
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

const getSortUri = (id: string, direction: SortDirection, currentSearchParams: URLSearchParams): URLSearchParams => {
  currentSearchParams.set(id, direction.valueOf());

  return currentSearchParams;
};

const getProjectsByFilters = (projects: Project[], filters: URLSearchParams): Project[] => {
  let currentProjects = [...projects];
  filters.forEach((value, key) => {
    if (key.includes('_sort')) {
      return;
    }
    currentProjects = currentProjects.filter((pr) => {
      if (key === 'area') {
        const range = value.split('-');

        return pr.buildingArea >= Number(range[0]) && pr.buildingArea <= Number(range[1]);
      }
      if (key === 'floor') {
        return floorFilter(value, pr);
      }
      if (key === 'bedroom') {
        return filterBedroom(value, pr);
      }
      if (key === 'garage') {
        return filterGarage(value, pr);
      }
      if (key === 'projectPrice') {
        const range = value.split('-');

        return pr.projectPrice >= Number(range[0]) && pr.projectPrice <= Number(range[1]);
      }
      if (key === 'buildingPrice') {
        const range = value.split('-');

        return pr.buildingPrice >= Number(range[0]) && pr.buildingPrice <= Number(range[1]);
      }
      if (key === 'style') {
        if (value === 'all') {
          return true;
        }

        return (
          (pr.style === 'классический' && value.includes('classic')) ||
          (pr.style === 'современный' && value.includes('modern'))
        );
      }

      return false;
    });
  });

  return currentProjects;
};

const floorFilter = (value: string, project: Project) => {
  if (value.includes('all')) {
    return true;
  }
  if (value.includes('attic')) {
    return !!project.floorList.find((fl) => fl.isAttic);
  }
  if (value.includes('basement')) {
    return !!project.floorList.find((fl) => fl.isBasement);
  }
  const floorCount = value.split('-')[0];

  return Number(floorCount) === project.floorList.length;
};

const filterBedroom = (value: string, pr: Project) => {
  if (value.includes('all')) {
    return true;
  }
  if (value.includes('>4')) {
    return Number(pr.bedroomCount) >= 4;
  }

  return Number(pr.bedroomCount) === Number(value);
};

const filterGarage = (value: string, pr: Project) => {
  if (value === 'all') {
    return true;
  }
  if (value === 'true') {
    return pr.isGaragePresent;
  }
  if (value === 'false') {
    return !pr.isGaragePresent;
  }

  return pr.isGaragePresent;
};

const sortProjectsByParams = (projects: Project[], searchParams: URLSearchParams): Project[] => {
  let currentProjects = projects;
  searchParams.forEach((value, key) => {
    if (!key.includes('sort')) {
      return;
    }

    currentProjects = currentProjects.sort((project1, project2) => {
      if (key === 'area_sort') {
        return compareProjects(project1, project2, value, 'generalArea');
      }
      if (key === 'popularity_sort') {
        return compareProjects(project1, project2, value, 'popularity');
      }
      if (key === 'projectPrice_sort') {
        return compareProjects(project1, project2, value, 'projectPrice');
      }

      return 0;
    });
  });

  return projects;
};

const compareProjects = (project1: Project, project2: Project, order: string, field: string) => {
  // @ts-ignore
  if (+project1[field] < +project2[field]) {
    return order === 'asc' ? -1 : 1;
  }

  // @ts-ignore
  if (+project1[field] > +project2[field]) {
    return order === 'asc' ? 1 : -1;
  }

  return 0;
};

export { getSearchUri, getSortUri, getProjectsByFilters, sortProjectsByParams };
