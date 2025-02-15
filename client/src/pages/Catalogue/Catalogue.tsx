import {useEffect, useState} from 'react'
import { getProjectsByFilters, sortProjectsByParams } from '@/services/data'
import catalogueSortInfo, {
	defaultSortDetails,
	SortDetails,
	SortDirection
} from '@/constants/sortData/catalogueSortInfo'
import CatalogueItem from './CatalogueItem/CatalogueItem'
import { useLocation } from 'react-router'
import {useGetAllProjects} from "@/api/useGetAllProjects";
import {ProjectDto} from "@/api/model";

const projectsPerPage = 8;

export const Catalogue = () => {
  const [state, setState] = useState({ projects: [] as ProjectDto[], currentProjects: [] as ProjectDto[], currentPage: 1 });
  const location = useLocation();

  const {data:projects} = useGetAllProjects();

  useEffect(() => {
    if (projects) {
      setState((prevState) => ({ ...prevState, projects }));
    }
  }, [projects, ]);

  if(!projects) return <div>Loading...</div>

  const applyFilter = (searchParams: URLSearchParams) => {
    const filteredProjects = getProjectsByFilters(state.projects, searchParams);
    setState({ ...state, currentProjects: filteredProjects, currentPage: 1 });
  };

  const applySort = (searchParams: URLSearchParams) => {
    const sortedProjects = sortProjectsByParams(state.projects, searchParams);

    setState({ ...state, currentProjects: sortedProjects, currentPage: 1 });
  };

  const handlePageChange = (nextPage: number) => {
    setState({ ...state, currentPage: nextPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function getSortDetailsByUrl(urlParams: URLSearchParams): SortDetails | undefined {
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

