import React, {useState} from 'react';
import { Modal} from '../../context/Modal';
import GroupForm from './GroupForm';

function GroupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => {
                setShowModal(true)
            }}><i className="fa-solid fa-pencil" /></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <GroupForm />
                </Modal>
            )}
        </>
    );
}

export default GroupFormModal;
