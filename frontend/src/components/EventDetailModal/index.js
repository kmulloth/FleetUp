import React, {useState} from 'react';
import { Modal} from '../../context/Modal';
import EventDetail from './EventDetail';

function EventDetailModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => {
                setShowModal(true)
            }}></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EventDetail />
                </Modal>
            )}
        </>
    );
}

export default EventDetailModal;
