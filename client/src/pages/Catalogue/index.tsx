import React, { Component } from 'react';
import Container from '../../containers/hoc/Container';
import VisitedProjects from '../../containers/VisitedProjects';
import FilterList from './FilterList';
import ProjectList from './ProjectList';
import classes from './Catalogue.module.scss';
import { ProjectPreviewDetails } from '../../entity/ProjectPreviewDetails';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import CatalogueHeader from './CatalogueHeader';
import Pagination from '../../components/UI/Pagination';
import { getProjectsByFilters, sortProjectsByParams } from '../../services/data';
import { RouteComponentProps, withRouter } from 'react-router';
import catalogueSortInfo, {
  defaultSortDetails,
  SortDetails,
  SortDirection,
} from '../../constants/sortData/catalogueSortInfo';

const projectsPerPage = 8;

interface State {
  projects: ProjectPreviewDetails[];
  currentPage: number;
}

class Catalogue extends Component<RouteComponentProps<any>, State> {
  state = { projects: [] as ProjectPreviewDetails[], currentPage: 1 };

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(this.props.location.search);
    const filteredProjects = getProjectsByFilters(urlSearchParams);
    const sortedProjects = sortProjectsByParams(filteredProjects, urlSearchParams);
    this.setState({ ...this.state, projects: sortedProjects });
  }

  applyFilter = (searchParams: URLSearchParams) => {
    const filteredProjects = getProjectsByFilters(searchParams);
    this.setState({ ...this.state, projects: filteredProjects });
  }

  applySort = (searchParams: URLSearchParams) => {
    const sortedProjects = sortProjectsByParams(this.state.projects, searchParams);
    this.setState({ ...this.state, projects: sortedProjects });
  }

  handlePageChange = (nextPage: number) => {
    this.setState({ ...this.state, currentPage: nextPage });
  }

  render() {
    const { projects, currentPage } = this.state;

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const urlFilters = new URLSearchParams(this.props.location.search);

    const sortDetails = this.getSortDetailsByUrl(urlFilters);

    return <div className={ classes.Catalogue }>
      <Container>
        <div className={ classes.Catalogue_Breadcrumbs }>
          <Breadcrumbs/>
        </div>
        <div>
          <h1 className={ classes['catalogue__title'] }>КАТАЛОГ ДОМОВ</h1>
        </div>
        <div className={ classes['catalogue-main'] }>
          <FilterList applyFilter={ this.applyFilter }/>
          <div>
            <CatalogueHeader count={ projects.length }
                             sortDetails={ sortDetails }
                             applySort={ this.applySort }/>
            <div>
              <ProjectList projects={ currentProjects }/>
              <Pagination items={ projects }
                          currentPage={ this.state.currentPage }
                          itemsPerPage={ projectsPerPage }
                          onPageChange={ this.handlePageChange }/>
            </div>
          </div>
        </div>

        { /*todo: check if can be extracted above*/ }
        <VisitedProjects/>
      </Container>

    </div>;
  }

  private getSortDetailsByUrl(urlParams: URLSearchParams): SortDetails | undefined {
    const popularityDirection = urlParams.get('popularity_sort');
    if (popularityDirection) {
      return this.getSortDetails(popularityDirection, 'popularity_sort');
    }

    const areaDirection = urlParams.get('area_sort');
    if (areaDirection) {
      return this.getSortDetails(areaDirection, 'area_sort');
    }

    const priceDirection = (urlParams.get('projectPrice_sort'));

    if (priceDirection) {
      return this.getSortDetails(priceDirection, 'projectPrice_sort');
    }

    return defaultSortDetails;
  }

  private getSortDetails(directionString: string, id: string) {
    const catalogueSortDetails = catalogueSortInfo.get(id);
    if (!catalogueSortDetails) {
      return ;
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
}

export default withRouter(Catalogue);
