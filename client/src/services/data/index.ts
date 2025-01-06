import { FilterType, RangeOption, SearchOption } from '@/constants/filterData/catalogueFiltersInfo'
import { SortDirection } from '@/constants/sortData/catalogueSortInfo'
import {ProjectDto} from "@/api/model";

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

type FilterFunction = (value: string, project: ProjectDto) => boolean;

const filterFunctions: Record<string, FilterFunction> = {
  area: (value, project) => filterRange(value, project, project.buildingArea),
  floor: (value, project) => floorFilter(value, project),
  bedroom: (value, project) => filterBedroom(value, project),
  garage: (value, project) => filterGarage(value, project),
  projectPrice: (value, project) => filterRange(value, project, project.projectPrice),
  buildingPrice: (value, project) => filterRange(value, project, project.buildingPrice),
  style: (value, project) => filterStyle(value, project)
};

const applyFilters = (project: ProjectDto, filters: URLSearchParams): boolean => {
  let isMatch = true;

  filters.forEach((value, key) => {
    const filterFunction = filterFunctions[key];
    if (key.includes('_sort')) {
      return;
    }
    if (!filterFunction(value, project)) {
      isMatch = false;
      return;
    }
  });

  return isMatch;
}

const getProjectsByFilters = (projects: ProjectDto[], filters: URLSearchParams): ProjectDto[] => {
  let currentProjects = [...projects];
  
  if (!filters.keys().next().value) return currentProjects;
  
  return currentProjects.filter((pr) => applyFilters(pr, filters));

};

const filterRange = (value: string, project: ProjectDto, field: number): boolean => {
  const [min, max] = value.split('-').map(Number);
  return field >= min && field <= max;
}

const filterStyle = (value: string, project: ProjectDto): boolean => {
  if (value === 'all') return true;
    return (
      (project.style === "classic" && value.includes("classic")) ||
      (project.style === "modern" && value.includes("modern"))
    );
}

const floorFilter = (value: string, project: ProjectDto): boolean => {
  isAllValue(value);

  const floorSuffix = '-floor';
  const floors = value.split(',')
    .map(v => {
      if (v.includes(floorSuffix)) {
        return v.replace(floorSuffix, '');
      }
      return v;
    });

  return floors.includes(String(project.floors.length)) 
    || floors.includes('attic') && project.floors.find((fl) => fl.isAttic)
    || floors.includes('basement') && project.floors.find((fl) => fl.isBasement) ? true : false;
};

const filterBedroom = (value: string, pr: ProjectDto): boolean => {
  if (value.includes('all')) {
    return true;
  }
    
  const bedrooms = value.split(",");
  return bedrooms.includes(String(pr.bedroomCount)) || 
    Number(pr.bedroomCount) >= 4 && bedrooms.includes('>4');
};

const filterGarage = (value: string, pr: ProjectDto): boolean => {
  isAllValue(value);

  if (value === 'true') {
    return pr.isGaragePresent;
  }
  if (value === 'false') {
    return !pr.isGaragePresent;
  }

  return pr.isGaragePresent;
};

const sortProjectsByParams = (projects: ProjectDto[], searchParams: URLSearchParams): ProjectDto[] => {
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

const compareProjects = (project1: ProjectDto, project2: ProjectDto, order: string, field: string) => {
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

const isAllValue = (value: string) => value.includes('all')

export { getSearchUri, getSortUri, getProjectsByFilters, sortProjectsByParams };
