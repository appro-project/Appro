import { Dispatch, useEffect } from 'react'
import OrderModal from './OrderModal'
import './modal.scss'

interface OrderModalContainerProps {
	setOpen: Dispatch<boolean>;
	project?: string;
	title?: string
}

export const OrderModalContainer = ({ setOpen, project, title }: OrderModalContainerProps) => {
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
			<OrderModal 
				title={title}
				project={project} 
				onClose={handleCloseModal} 
			/>
		</div>
	)
}
