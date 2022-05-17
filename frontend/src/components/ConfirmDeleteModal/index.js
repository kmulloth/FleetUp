import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDelete from './ConfirmDelete';

function ConfirmDeleteModal({eventId, setShowDetail}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => {
        setShowModal(true)
        console.log('TEST DELETE BUTTON', showModal)
        }}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ConfirmDelete eventId={eventId}/>
        </Modal>
      )}
    </>
  );
}

export default ConfirmDeleteModal;
