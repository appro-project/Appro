import  { ReactNode } from 'react'
import Wrapper from '../Wrapper/Wrapper'
import { Footer } from '@/components/Footer/Footer'

import classes from './Layout.module.scss'
import { Header } from '@/components/Header/Header'

interface Props {
  children: ReactNode;
}

export const Layout = (props: Props) => {
  return (
    <Wrapper>
      <Header />
      <main className={classes.content}>{props.children}</main>
      <Footer />
    </Wrapper>
  );
};
