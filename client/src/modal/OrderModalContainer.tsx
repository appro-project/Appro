import { Dispatch, useEffect } from 'react'
import OrderModal from './OrderModal'
import './modal.scss'

interface OrderModalContainerProps {
	setOpen: Dispatch<boolean>;
	project: string;
}

export const OrderModalContainer = ({ setOpen, project }: OrderModalContainerProps) => {
	const handleCloseModal = () => {
		setOpen(false)
	}

	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [])

	return (
		<div className={`modal-container`}>
			<OrderModal project={project} onClose={handleCloseModal} />
		</div>
	)
}
