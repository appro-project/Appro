import React, { ReactNode } from 'react';
import Wrapper from '../Wrapper';
import Footer from '../../../components/Footer';

import classes from './Layout.module.scss';
import Header from 'components/Header';

interface Props {
    children: ReactNode;
}

const Layout = (props: Props) => {
    return <Wrapper>
        <Header/>
        <main className={ classes.content}>{ props.children }</main>
        <Footer/>
    </Wrapper>;
};

export default Layout;
