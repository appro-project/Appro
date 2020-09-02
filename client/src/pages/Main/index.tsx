import React from 'react';
import Welcome from './Welcome';
import Popular from './Popular';
import Principles from './Principles';
import Feedback from './Feedback';
import About from './About';

const Index = () => {
    return <React.Fragment>
        <Welcome/>
        <Popular/>
        <About/>
        <Principles/>
        <Feedback/>
    </React.Fragment>;
};

export default Index;
