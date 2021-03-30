import React, { Component } from 'react';
import Container from '../../containers/hoc/Container';
import VisitedProjects from '../../containers/VisitedProjects';
import FilterList from './FilterList';
import ProjectList from './ProjectList';
import classes from './Catalogue.module.scss';
import projectsData from '../../mock/projectsData';
import { RouteComponentProps, withRouter } from 'react-router';
import catalogueFiltersInfo,
{ CatalogueFilterInfo, SearchOption } from '../../constants/filterData/catalogueFiltersInfo';
import { getSearchUri } from '../../services/data';
import { ProjectPreviewDetails } from '../../entity/ProjectData';

interface State {
    filters: CatalogueFilterInfo[];
    projects: ProjectPreviewDetails[];
}

type Props =  RouteComponentProps<any>;

class Catalogue extends Component<Props, State> {
    state = { filters: [], projects: [] };

    componentDidMount() {
        const projects = [...projectsData];
        projects.push(projectsData[0]);
        projects.push(projectsData[0]);
        projects.push(projectsData[0]);
        projects.push(projectsData[0]);
        const defaultFilters = [...catalogueFiltersInfo];
        const urlFilters = new URLSearchParams(this.props.location.search);
        const filters = this.mergeUrlAndDefaultFilters(urlFilters, defaultFilters);
        this.setState({ ...this.state, filters, projects });
    }

    applyFilter = (searchOption: SearchOption, isChecked: boolean) => {
        const { location, history } = this.props;
        const searchParams = new URLSearchParams(location.search);

        const search = getSearchUri(searchOption, isChecked, searchParams);

        history.push({
            search,
            pathname: location.pathname,
        });
    }

    // todo: breadcrumbs
    render() {
        const { filters, projects } = this.state;

        return <React.Fragment>
            <Container>
                <div>
                    <h1>КАТАЛОГ ДОМОВ</h1>
                    <div/>
                </div>
                <div className={ classes['catalogue-main'] }>
                    <FilterList filters = { filters } applyFilter = { this.applyFilter }/>
                    <ProjectList projects={ projects }/>
                </div>
                <div className={ 'pagination' }/>
                { /*todo: check if can be extracted above*/ }
                <VisitedProjects/>
            </Container>

        </React.Fragment>
            ;
    }

    private mergeUrlAndDefaultFilters(urlFilters: URLSearchParams,
                                      defaultFilters: CatalogueFilterInfo[]):
        CatalogueFilterInfo[] {
        const filters = [...defaultFilters];
        // todo: implement
        for (const urlFilter of urlFilters) {
            const filterId = urlFilter[0];
            const filterValue = urlFilter[1];
            console.log(filterId, filterValue);
        }

        return filters;
    }

}

export default withRouter(Catalogue);
