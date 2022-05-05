import React, {useState} from "react";
import {Modal} from "../../context/Modal";
import RSVP from "./RSVP";

function RSVPModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => {
                setShowModal(true)
                console.log('TEST RSVP BUTTON', showModal)
                }}>RSVP</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <RSVP />
                </Modal>
            )}
        </>
    );
}

export default RSVPModal;
