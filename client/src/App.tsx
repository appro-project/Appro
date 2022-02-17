import React, { useEffect } from 'react';
import Layout from 'containers/hoc/Layout';
import Index from './pages/Main';
import Catalogue from './pages/Catalogue';
import IndividualProject from './pages/IndividualProject';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProjectPage from './pages/Project';
import Admin from './pages/Admin';
import { AdditionalOptions } from './pages/AdditionalOptions';
import { AboutUs } from './pages/AboutUs';
import { getProjectsFromDb, setViewAllProjects } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectInLocalStorage } from './services/util/localStorage';
import { getProjects } from './redux/selectors';

const App = () => {
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);

  useEffect(() => {
    dispatch(getProjectsFromDb());
  }, []);

  useEffect(() => {
    const projectInLocalStorage: number[] = getProjectInLocalStorage();
    if (projectInLocalStorage) {
      const filterProjects = projects.filter((elem) => projectInLocalStorage.includes(elem.id));
      dispatch(setViewAllProjects(filterProjects));
    }
  }, [projects]);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path={'/'} exact={true}>
            <Index />
          </Route>
          <Route path={'/admin'} exact={true}>
            <Admin />
          </Route>
          <Route path={'/individual-project'} exact={true}>
            <IndividualProject />
          </Route>
          <Route path={'/catalogue'} exact={true}>
            <Catalogue />
          </Route>
          <Route path={'/catalogue/:projectId'}>
            <ProjectPage />
          </Route>

          <Route path={'/additional'} exact={true}>
            <AdditionalOptions />
          </Route>

          <Route path={'/about'} exact={true}>
            <AboutUs />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
