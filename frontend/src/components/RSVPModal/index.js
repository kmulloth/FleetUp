import React, {useState} from "react";
import {Modal} from "../../context/Modal";
import RSVP from "./RSVP";

function RSVPModal({eventId}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => {
                setShowModal(true)
                }}>RSVP</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <RSVP eventId={eventId} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default RSVPModal;
