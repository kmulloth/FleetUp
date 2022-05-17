import React, {useState} from "react";
import * as rsvpActions from "../../store/rsvps";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import './RSVP.css';

function RSVPform({eventId, setShowModal}) {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const user_id = user.id
    const event_id = eventId;


    // console.log('user_id:', user_id.id, '--- event_id:', event_id);

    const {createRsvp, getRsvps} = rsvpActions;

    const handleSubmit = (e) => {
        e.preventDefault();

        const rsvp = { user_id , event_id};

        dispatch(createRsvp(rsvp)).then(setShowModal(false));
    }

    return(
        <div>
            <h1>RSVP Form</h1>
            <form action="/api/rsvp/new" method="post" onSubmit={handleSubmit}>
                <button type="submit">RSVP</button>
            </form>
        </div>
    )
}

export default RSVPform;
