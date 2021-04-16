import React, { Component } from 'react';
import Container from '../../containers/hoc/Container';
import VisitedProjects from '../../containers/VisitedProjects';
import FilterList from './FilterList';
import ProjectList from './ProjectList';
import classes from './Catalogue.module.scss';
import projectsData from '../../mock/projectsData';
import { ProjectPreviewDetails } from '../../entity/ProjectData';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import CatalogueHeader from './CatalogueHeader';

interface State {
    projects: ProjectPreviewDetails[];
}

class Catalogue extends Component<{}, State> {
    state = { projects: [] as ProjectPreviewDetails[] };

    componentDidMount() {
        const projects = [...projectsData];
        projects.push(projectsData[0]);
        projects.push(projectsData[0]);
        projects.push(projectsData[0]);
        projects.push(projectsData[0]);
        this.setState({ ...this.state, projects });
    }

    applyFilter = (searchParams: URLSearchParams) => {
       console.log('filter applied', searchParams.toString());
    }

    applySort = (searchParams: URLSearchParams) => {
        console.log('filter applied', searchParams.toString());
    }

    // todo: breadcrumbs
    render() {
        const { projects } = this.state;

        return <React.Fragment>
            <Breadcrumbs/>
            <Container>
                <div>
                    <h1>КАТАЛОГ ДОМОВ</h1>
                    <div/>
                </div>
                <div className={ classes['catalogue-main'] }>
                    <FilterList applyFilter = { this.applyFilter }/>
                    <div>
                        <CatalogueHeader count={ projects.length }
                                         applySort={ this.applySort }/>
                        <ProjectList projects={ projects }/>
                    </div>
                </div>
                <div className={ 'pagination' }/>
                { /*todo: check if can be extracted above*/ }
                <VisitedProjects/>
            </Container>

        </React.Fragment>
            ;
    }

}

export default Catalogue;
