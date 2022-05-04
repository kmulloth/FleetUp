import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDelete from './ConfirmDelete';

function ConfirmDeleteModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => {
        setShowModal(true)
        console.log('TEST DELETE BUTTON', showModal)
        }}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ConfirmDelete />
        </Modal>
      )}
    </>
  );
}

export default ConfirmDeleteModal;
