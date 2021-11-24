import React, {Component, PureComponent} from 'react';
import {getProjectsByFilters, sortProjectsByParams} from '../../services/data';
import {RouteComponentProps, withRouter} from 'react-router';
import catalogueSortInfo, {
    defaultSortDetails,
    SortDetails,
    SortDirection,
} from '../../constants/sortData/catalogueSortInfo';
import {Project} from '../../entity/Project';
import CatalogueItem from "./CatalogueItem";
import {getProjects, getProjectsLoading, RootState} from "../../reducers";
import {Action, compose} from "redux";
import {connect} from "react-redux";
// @ts-ignore
import {ThunkDispatch} from "redux-thunk";
import {getProjectsFromDb} from "../../actions";

const projectsPerPage = 8;

interface State {
    projects: Project[];
    currentProjects: Project[];
    currentPage: number;
}

interface StateProps {
    projectsLoading: boolean;
    projects: Project[];
}

interface DispatchProps {
    getProjectsFromDb(): void;
}

type PropsType = StateProps & DispatchProps & RouteComponentProps<any>;

class Catalogue extends React.Component<PropsType, State> {
    state = {projects: [] as Project[], currentProjects: [] as Project[], currentPage: 1};

    componentDidMount() {
        this.props.getProjectsFromDb();
    }

    applyFilter = (searchParams: URLSearchParams) => {
        const filteredProjects = getProjectsByFilters(this.state.projects, searchParams);
        this.setState({...this.state, currentProjects: filteredProjects});
    }

    applySort = (searchParams: URLSearchParams) => {
        const sortedProjects = sortProjectsByParams(this.state.projects, searchParams);
        this.setState({...this.state, currentProjects: sortedProjects});
    }

    handlePageChange = (nextPage: number) => {
        this.setState({...this.state, currentPage: nextPage});
    }

    render() {
        const {projects} = this.props;
        console.log(this.props.projects);
        const urlSearchParams = new URLSearchParams(this.props.location.search);
        const filteredProjects = getProjectsByFilters(projects, urlSearchParams);
        const currentProjects = sortProjectsByParams(filteredProjects, urlSearchParams);

        const {currentPage} = this.state;

        const indexOfLastProject = currentPage * projectsPerPage;
        const indexOfFirstProject = indexOfLastProject - projectsPerPage;
        const currentProjectsPaged = currentProjects.slice(indexOfFirstProject, indexOfLastProject);
        const urlFilters = new URLSearchParams(this.props.location.search);

        const sortDetails = this.getSortDetailsByUrl(urlFilters);

        return <CatalogueItem applyFilter={this.applyFilter}
                              currentProjects={currentProjects}
                              sortDetails={sortDetails}
                              applySort={this.applySort}
                              currentProjectsPaged={currentProjectsPaged}
                              currentPage={this.state.currentPage}
                              projectsPerPage={projectsPerPage}
                              handlePageChange={this.handlePageChange}
        />
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
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        projectsLoading: getProjectsLoading(state),
        projects: getProjects(state)
    }
}

export default compose(withRouter, connect<StateProps, DispatchProps, {}, RootState>(mapStateToProps,
    (dispatch: ThunkDispatch<RootState, void, Action>): DispatchProps => ({
        getProjectsFromDb: () => dispatch(getProjectsFromDb.action({}))
    })
))(Catalogue);
