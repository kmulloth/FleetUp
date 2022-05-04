import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams  } from 'react-router-dom';
import * as eventActions from '../../store/events';
import './eventDetail.css';

function EventDetail(){

    const {eventId} = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => state.events.events);

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
                    <NavLink to={`/api/events/${eventId}/edit`}>Edit Event</NavLink>
                    <NavLink to={`/api/events/${eventId}/delete`}>Delete Event</NavLink>
                </div>
            </div>
            <p>{event&&event?.body}</p>
        </div>
    )
}

export default EventDetail;
