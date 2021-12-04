import React from 'react';
import Layout from 'containers/hoc/Layout';
import Index from './pages/Main';
import Catalogue from './pages/Catalogue';
import IndividualProject from './pages/IndividualProject';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProjectPage from './pages/Project';
import Admin from "./pages/Admin";
import Additional from "./pages/Project/Additional";
import {AdditionalOptions} from "./pages/AdditionalOptions";
import {AboutUs} from "./pages/AboutUs";

const App = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path={'/'} exact={true}>
                        <Index/>
                    </Route>
                    <Route path={'/admin/add'} exact={true}>
                        <Admin/>
                    </Route>
                    <Route path={'/individual-project'} exact={true}>
                        <IndividualProject/>
                    </Route>
                    <Route path={'/catalogue'} exact={true}>
                        <Catalogue/>
                    </Route>
                    <Route path={'/catalogue/:projectId'} component={ProjectPage}/>

                    <Route path={'/additional'} exact={true}>
                        <AdditionalOptions/>
                    </Route>

                    <Route path={'/about'} exact={true}>
                        <AboutUs/>
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
};

export default App;
