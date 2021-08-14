import React from 'react';
import Layout from 'containers/hoc/Layout';
import Index from './pages/Main';
import Catalogue from './pages/Catalogue';
import IndividualProject from './pages/IndividualProject';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Project from './pages/Project';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path={ '/' } exact = { true }>
            <Index/>
          </Route>
          <Route path={ '/individual-project' } exact = { true }>
            <IndividualProject/>
          </Route>
          <Route path={ '/catalogue' } exact = { true }>
            <Catalogue/>
          </Route>
          <Route path={ '/catalogue/:projectId' } component = { Project }/>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
