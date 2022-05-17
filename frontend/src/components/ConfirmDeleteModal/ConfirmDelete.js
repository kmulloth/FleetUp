import React from "react";
import * as eventActions from "../../store/events";
import { useSelector, useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router-dom";

function ConfirmDelete({eventId, setShowDetail}) {
    console.log('DELETE EVENT:',eventId)
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(eventActions.deleteOneEvent(eventId))
        setShowDetail(false);
    };

    return (
        <form action={`/api/events/${eventId}`} method="delete" onSubmit={e => handleSubmit(e)}>
            <p>Are you sure you want to Delete this Event?</p>
            <button type="submit" value="Delete Event">Yes</button>
        </form>
    )
}

export default ConfirmDelete;
