import { FC, useEffect } from 'react'
import OrderModal from './OrderModal'
import './modal.scss'
import { useModalStore } from './order-modal-cantainer.strore';

export const OrderModalContainer: FC = () => {
	const { isOpen, project, title, closeModal } = useModalStore();

	useEffect(() => {
		if (isOpen) {
		  document.body.style.overflow = 'hidden';
		} else {
		  document.body.style.overflow = 'auto';
		}
	
		return () => {
		  document.body.style.overflow = 'auto';
		};
	  }, [isOpen]);
	
	  if (!isOpen) return null;

	  return (
		<div className="modal-container">
		  <OrderModal
			title={title || ''}
			project={project || ''}
			onClose={closeModal}
		  />
		</div>
	  );
}
