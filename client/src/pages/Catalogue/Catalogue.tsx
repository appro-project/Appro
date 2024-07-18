import {useEffect, useState} from 'react'
import { getProjectsByFilters, sortProjectsByParams } from '@/services/data'
import catalogueSortInfo, {
	defaultSortDetails,
	SortDetails,
	SortDirection
} from '@/constants/sortData/catalogueSortInfo'
import { Project } from '@/entity/Project'
import CatalogueItem from './CatalogueItem/CatalogueItem'
import { useLocation } from 'react-router'
import {useGetAllProjects} from "@/api/useGetAllProjects";

const projectsPerPage = 8;

export const Catalogue = () => {
  const [state, setState] = useState({ projects: [] as Project[], currentProjects: [] as Project[], currentPage: 1 });
  const location = useLocation();

  const {data:projects} = useGetAllProjects();

  useEffect(() => {
    setState({ ...state, projects });
  }, [projects]);

  if(!projects) return <div>Loading...</div>

  const applyFilter = (searchParams: URLSearchParams) => {
    const filteredProjects = getProjectsByFilters(state.projects, searchParams);
    setState({ ...state, currentProjects: filteredProjects });
  };

  const applySort = (searchParams: URLSearchParams) => {
    const sortedProjects = sortProjectsByParams(state.projects, searchParams);
    setState({ ...state, currentProjects: sortedProjects });
  };

  const handlePageChange = (nextPage: number) => {
    setState({ ...state, currentPage: nextPage });
  };

  function getSortDetailsByUrl(urlParams: URLSearchParams): SortDetails | undefined {
    const popularityDirection = urlParams.get('popularity_sort');
    if (popularityDirection) {
      return getSortDetails(popularityDirection, 'popularity_sort');
    }

    const areaDirection = urlParams.get('area_sort');
    if (areaDirection) {
      return getSortDetails(areaDirection, 'area_sort');
    }

    const priceDirection = urlParams.get('projectPrice_sort');

    if (priceDirection) {
      return getSortDetails(priceDirection, 'projectPrice_sort');
    }

    return defaultSortDetails;
  }

  function getSortDetails(directionString: string, id: string) {
    const catalogueSortDetails = catalogueSortInfo.get(id);
    if (!catalogueSortDetails) {
      return;
    }
    let sortDirection;
    if (SortDirection.ASC.valueOf() === directionString) {
      sortDirection = SortDirection.ASC;
    }
    if (SortDirection.DESC.valueOf() === directionString) {
      sortDirection = SortDirection.DESC;
    }
    catalogueSortDetails.direction = sortDirection;

    return catalogueSortDetails;
  }

  const urlSearchParams = new URLSearchParams(location.search);
  const filteredProjects = getProjectsByFilters(projects, urlSearchParams);
  const currentProjects = sortProjectsByParams(filteredProjects, urlSearchParams);

  const { currentPage } = state;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjectsPaged = currentProjects.slice(indexOfFirstProject, indexOfLastProject);
  const urlFilters = new URLSearchParams(location.search);

  const sortDetails = getSortDetailsByUrl(urlFilters);

  return (
    <CatalogueItem
      applyFilter={applyFilter}
      currentProjects={currentProjects}
      sortDetails={sortDetails}
      applySort={applySort}
      currentProjectsPaged={currentProjectsPaged}
      currentPage={state.currentPage}
      projectsPerPage={projectsPerPage}
      handlePageChange={handlePageChange}
    />
  );
};

