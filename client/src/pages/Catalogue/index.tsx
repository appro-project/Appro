import React from 'react';
import Container from '../../containers/hoc/Container';
import VisitedProjects from '../../containers/VisitedProjects';
import CatalogueFilters from './CatalogueFilters';
import ProjectList from './ProjectList';
import classes from './Catalogue.module.scss';
import projectsData from '../../mock/projectsData';
import { RouteComponentProps, withRouter } from 'react-router';
import { SearchOption } from '../../constants/filterData/catalogueFiltersInfo';
import { getSearchUri } from '../../services/data';

const Catalogue = (routeProps: RouteComponentProps<any>) => {
    const applyFilter = (searchOption: SearchOption, isChecked: boolean) => {
        console.log('searchOption', searchOption);
        const searchParams = new URLSearchParams(routeProps.location.search);
        const search = getSearchUri(searchOption, isChecked, searchParams);

        routeProps.history.push({
            search,
            pathname: routeProps.location.pathname,
        });
    };
    const data = [...projectsData];
    data.push(projectsData[0]);
    data.push(projectsData[0]);
    data.push(projectsData[0]);
    data.push(projectsData[0]);

    // todo: breadcrumbs
    return <React.Fragment>
        <Container>
            <div>
                <h1>КАТАЛОГ ДОМОВ</h1>
                <div/>
            </div>
            <div className={ classes['catalogue-main'] }>
                <CatalogueFilters applyFilter={ applyFilter }/>
                <ProjectList projects={ data }/>
            </div>
            <div className={ 'pagination' }/>
            { /*todo: check if can be extracted above*/ }
            <VisitedProjects/>
        </Container>

    </React.Fragment>
        ;
};

export default withRouter(Catalogue);
