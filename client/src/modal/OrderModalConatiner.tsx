import React, { Dispatch, useEffect, useState } from 'react';
import OrderModal from './OrderModal';
import './modal.scss';

interface OrderMadalConatinerProps {
  setOpen: Dispatch<boolean>;
  project: string;
}

const OrderModalConatiner = ({ setOpen, project }: OrderMadalConatinerProps) => {
  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={`modal-container`}>
      <OrderModal project={project} onClose={handleCloseModal} />
    </div>
  );
};

export default OrderModalConatiner;
