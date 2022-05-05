import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDeleteRSVP from './confirmDeleteRSVP';

function ConfirmDeleteRSVPModal({rsvp}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => {
                setShowModal(true)
                console.log('TEST DELETE BUTTON', showModal)
                }}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ConfirmDeleteRSVP rsvp={rsvp}/>
                </Modal>
            )}
        </>
    );
}

export default ConfirmDeleteRSVPModal;
