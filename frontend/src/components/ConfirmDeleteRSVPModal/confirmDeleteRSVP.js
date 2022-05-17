import React from "react";
import * as rsvpActions from "../../store/rsvps";
import { useDispatch } from "react-redux";

function ConfirmDeleteRSVP({rsvp}) {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(rsvpActions.deleteOneRsvp(rsvp.id))
    }

    return (
        <form action={`/api/rsvps/${rsvp.id}`} method="delete" onSubmit={handleSubmit}>
            <p>Are you sure you want to Delete this RSVP?</p>
            <button type="submit" value="Delete RSVP">Yes</button>
        </form>
    )
}

export default ConfirmDeleteRSVP;
