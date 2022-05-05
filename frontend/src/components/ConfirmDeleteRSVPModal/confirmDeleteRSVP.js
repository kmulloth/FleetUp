import React from "react";
import * as rsvpActions from "../../store/rsvps";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function ConfirmDeleteRSVP({rsvp}) {

    // const { rsvp } = useSelector(state => state.rsvps?.rsvp.id);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('222222', rsvp.id)

        dispatch(rsvpActions.deleteOneRsvp(rsvp.id))
    }

    const rsvpId = rsvp.id;

    console.log('111111', rsvpId)

    return (
        <form action={`/api/rsvps/${rsvp.id}`} method="delete" onSubmit={handleSubmit}>
            <p>Are you sure you want to Delete this RSVP?</p>
            <button type="submit" value="Delete RSVP">Yes</button>
        </form>
    )
}

export default ConfirmDeleteRSVP;
