import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams  } from 'react-router-dom';
import * as eventActions from '../../store/events';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import RSVPModal from '../RSVPModal';
import './eventDetail.css';

function EventDetail(){

    const {eventId} = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => state.events.events);
    const user = useSelector(state => state.session.user);

    console.log('!!!!!', event);

    useEffect(() => {
        dispatch(eventActions.getOneEvent(eventId));
    }, [dispatch]);

    return (
        <div>
            <div id='event-detail-header'>
                <div id='event-titles'>
                    <h1>{event&&event?.name}</h1>
                    <h2>Captain: {event&&event.User?.username}</h2>
                </div>

                <div id='event-buttons'>
                    {event.User?.id === user.id ? <NavLink to={`/api/events/${eventId}/edit`} >Edit Event</NavLink> : <></>}
                    {event.User?.id === user.id ? <ConfirmDeleteModal /> : <></>}
                    {event.User?.id !== user.id ? <RSVPModal /> : <></>}
                </div>
            </div>
            <p>{event&&event?.body}</p>
        </div>
    )
}

export default EventDetail;
