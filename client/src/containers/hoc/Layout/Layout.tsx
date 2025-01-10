import { Wrapper } from '../Wrapper/Wrapper'
import { Footer } from '@/components/Footer/Footer'
import classes from './Layout.module.scss'
import { Header } from '@/components/Header/Header'
import { Outlet } from 'react-router'
import { OrderModalContainer } from '@/modal/OrderModalContainer'


export const Layout = () => {
	return (
		<Wrapper>
			<Header />
			<main className={classes.content}>
				<Outlet />
			</main>
			<Footer />
			<OrderModalContainer />
		</Wrapper>
	)
}
