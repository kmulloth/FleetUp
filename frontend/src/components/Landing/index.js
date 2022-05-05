import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getEvents } from '../../store/events.js';
import { getRsvps } from '../../store/rsvps.js';
import ConfirmDeleteRSVPModal from '../ConfirmDeleteRSVPModal';
import './landing.css'

function Landing () {

    // const [eventArr, setEventArr] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const events = Object.values(useSelector(state => state?.events?.events));
    const rsvps = Object.values(useSelector(state => state?.rsvps?.rsvps));

    // console.log(events)
    // console.log(sessionUser,);

    useEffect(() => {
        dispatch(getEvents({include: [{model: 'User'}]}));
    }, [dispatch])

    useEffect(() => {
        dispatch(getRsvps({include: [{model: 'Event'}]}));
    }, [dispatch])

    return (
        <>
        <div id='landing'>
            <h1>Welcome {sessionUser.username}!</h1>
        </div>
        <div id='content'>
            <div id='user-sidebar'>
                <div id='reservations-header'>
                    <h2>Your Reservations</h2>

                </div>
                <div id='reservations-body'>
                    {rsvps.map(rsvp => {
                        return (
                            <div className='reservation-card' key={rsvp.id}>
                                <p>{rsvp.Event?.name}</p>
                                <p>{rsvp.Event?.date}</p>
                                <ConfirmDeleteRSVPModal rsvp={rsvp} />
                            </div>
                        )})}

                </div>
            </div>
            <div>
                <div id='events-header'>
                    <h2>Events</h2>
                    <NavLink to='api/events/new'>Create an Event!</NavLink>
                </div>
                <div id='events-container'>
                    {events.map(event => {

                        console.log(event)

                        return (
                            <NavLink to={`/api/events/${event?.id}`} key={ event?.id }>
                                <div className='event-card' >
                                    <div className='event-card-img'>
                                        <img src={event?.imgUrl === null ? 'https://farm4.static.flickr.com/3048/2618187623_27c6d8749d_o.jpg': event?.imgUrl} alt=''></img>
                                    </div>
                                    <div className='event-card-text'>
                                        <div className='event-card-header'>
                                            <p>{event?.date}</p>
                                            <div className='event-card-title'>
                                                <h3>{event?.name}</h3>
                                                <p>by</p>
                                                <h4>{event?.User?.username}</h4>
                                            </div>
                                        </div>
                                        <p>{event?.body}</p>
                                    </div>
                                </div>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default Landing;
