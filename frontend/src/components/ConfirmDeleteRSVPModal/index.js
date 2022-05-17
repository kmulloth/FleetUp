import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDeleteRSVP from './confirmDeleteRSVP';

function ConfirmDeleteRSVPModal({rsvp}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <i className='fa-solid fa-trash-can' onClick={() => {
                setShowModal(true)
                }}></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ConfirmDeleteRSVP rsvp={rsvp}/>
                </Modal>
            )}
        </>
    );
}

export default ConfirmDeleteRSVPModal;
