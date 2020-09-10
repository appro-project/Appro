import React from 'react';
import Layout from 'containers/hoc/Layout';
import Index from './pages/Main';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path={ '/' } exact = { true }>
            <Index/>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
