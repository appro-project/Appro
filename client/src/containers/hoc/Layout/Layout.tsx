import { Wrapper } from '../Wrapper/Wrapper'
import { Footer } from '@/components/Footer/Footer'
import classes from './Layout.module.scss'
import { Header } from '@/components/Header/Header'
import { Outlet } from 'react-router'
import { OrderModalContainer } from '@/modal/OrderModalContainer'
import SuccessPopup from '@/components/SuccessPopup/SuccessPopup'
import { useState } from 'react'


export const Layout = () => {
const [successMessageVisible, setSuccessMessageVisible] = useState(false)
const showSuccessMessage = () => {
	setSuccessMessageVisible(true)
	setTimeout(() => {
		setSuccessMessageVisible(false)
	}, 5000) 
}
	return (
		<Wrapper>
			<Header />
			<main className={classes.content}>
				<Outlet />
			</main>
			<Footer />
			<OrderModalContainer onFormSubmit={showSuccessMessage} />
			{successMessageVisible && <SuccessPopup />}
		</Wrapper>
	)
}
