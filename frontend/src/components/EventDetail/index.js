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
    let event = useSelector(state => state.events.events);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(eventActions.getOneEvent(eventId));
    }, [dispatch]);

    const formattedDate = new Date(event?.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });


    return (
        <div id='event'>
            <div id='event-detail-header'>
                <div id='event-titles'>
                    <p>{formattedDate}</p>
                    <h1>{event?.name}</h1>
                    <h2>Captain: {event.User?.username}</h2>
                </div>

                <div id='event-buttons'>
                    {event.User?.id === user.id ? <NavLink to={ `/api/events/${eventId}/edit`} >Edit Event</NavLink> : <></>}
                    {event.User?.id === user.id ? <ConfirmDeleteModal /> : <></>}
                    {event.User?.id !== user.id ? <RSVPModal /> : <></>}
                </div>
            </div>
            <div id='event-detail-body'>
                <div id='event-detail-body-left'>
                    <div id='img-container'>
                        <img src={!event?.imgUrl ? 'https://farm4.static.flickr.com/3048/2618187623_27c6d8749d_o.jpg': event?.imgUrl} alt='' />
                    </div>
                    <h3>Details: </h3>
                    <p>{event?.body}</p>
                </div>
            </div>
        </div>
    )
}

export default EventDetail;
