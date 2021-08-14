import React, { Component } from 'react';
import Container from '../../containers/hoc/Container';
import VisitedProjects from '../../containers/VisitedProjects';
import FilterList from './FilterList';
import ProjectList from './ProjectList';
import classes from './Catalogue.module.scss';
import projectsData from '../../mock/catalogueProjectsData';
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
    this.setState({ ...this.state, projects });
  }

  applyFilter = (searchParams: URLSearchParams) => {
    console.log('filter applied', searchParams.toString());

    // for demo, move to backend
    let currentProjects = this.state.projects;
    searchParams.forEach((value, key) => {
      currentProjects = currentProjects.filter((pr) => {
        console.log(key, value);
        if (value.includes('-')) {
          const range = value.split('-');
          console.log(range);

          // @ts-ignore
          return pr[key] >= range[0] && pr[key] <= range[1];
        }

        // @ts-ignore
        return pr[key] === value;
      });
    });
    this.setState({ ...this.state, projects: currentProjects });
  }

  applySort = (searchParams: URLSearchParams) => {
    console.log('sort applied', searchParams.toString());

    // for demo, move to backend
    let currentProjects = this.state.projects;
    searchParams.forEach((value, key) => {
      if (value === 'asc' || value === 'desc') {
        currentProjects = currentProjects.sort((pr1, pr2) => {
          // @ts-ignore
          const prKey = (key === 'area_sort') ? 'area' : 'project_price';
          console.log(prKey);
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
      }
    });
    console.log(currentProjects);
    this.setState({ ...this.state, projects: currentProjects });
  }

  // todo: breadcrumbs
  render() {
    const { projects } = this.state;

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
                             applySort={ this.applySort }/>
            <ProjectList projects={ projects }/>
          </div>
        </div>
        { /*todo: pagination!*/ }
        <div className={ 'pagination' }/>
        { /*todo: check if can be extracted above*/ }
        <VisitedProjects/>
      </Container>

    </div>;
  }

}

export default Catalogue;
