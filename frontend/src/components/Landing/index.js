import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getEvents } from '../../store/events.js';
import { getRsvps } from '../../store/rsvps.js';
import { getGroups } from '../../store/groups.js';
import ConfirmDeleteRSVPModal from '../ConfirmDeleteRSVPModal';
import GroupFormModal from '../GroupFormModal/index.js';
import './landing.css'

function Landing () {

    // const [eventArr, setEventArr] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const events = Object.values(useSelector(state => state?.events));
    const rsvps = Object.values(useSelector(state => state?.rsvps?.rsvps));
    const groups = useSelector(state => state?.groups?.groups);

    // console.log(events)
    // console.log(sessionUser,);

    useEffect(() => {
        dispatch(getEvents({include: [{model: 'User'}]}));
    }, [dispatch])

    useEffect(() => {
        dispatch(getRsvps({include: [{model: 'Event'}]}));
    }, [dispatch])

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch])

    return (
        <>
        <div id='landing'>
            <h1>Welcome, {sessionUser.username}!</h1>
        </div>
        <div id='content'>
            <div id='user-sidebar'>
                <div id='reservations'>
                    <div id='reservations-header'>
                        <h2>Your Reservations</h2>
                    </div>
                    <div id='reservations-body'>
                        {rsvps.map(rsvp => {
                            if (rsvp?.userId === sessionUser.id) {
                                const date = new Date(rsvp?.Event?.date).toLocaleTimeString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                });
                            return (
                                <div className='reservation-card' key={rsvp.id}>
                                    <div className='rsvp-card-content'>
                                        <p>{rsvp?.Event?.name}</p>
                                        <p>{date}</p>
                                    </div>
                                    <ConfirmDeleteRSVPModal rsvp={rsvp} />
                                </div>
                            )}})}
                    </div>
                </div>
                <div id='groups'>
                    <div id='group-header'>
                        <h2>Your Groups</h2>
                        <GroupFormModal />
                    </div>
                    <div id='group-body'>
                        {groups.map(group => {
                            if (group?.user_id === sessionUser.id) {
                            return (
                                <div className='group-card' key={group?.id}>
                                    <p>{group?.title}</p>
                                </div>
                            )}})}

                    </div>
                </div>
            </div>
            <div>
                <div id='events-header'>
                    <h2>Events</h2>
                    <NavLink to='api/events/new'><i className='fa-solid fa-pencil' /></NavLink>
                </div>
                <div id='events-container'>
                    {events.map(event => {
                        console.log('USER: ', event?.User)
                        const date = new Date(event?.date).toLocaleTimeString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        });

                        return (
                            <NavLink event={event} to={`/api/events/${event?.id}`} key={ event?.id }>
                                <div className='event-card' key={event?.id}>
                                    <div className='event-card-img'>
                                        <img src={!event?.imgUrl ? 'https://farm4.static.flickr.com/3048/2618187623_27c6d8749d_o.jpg': event?.imgUrl} alt=''></img>
                                    </div>
                                    <div className='event-card-text'>
                                        <div className='event-card-header'>
                                            <p>{date}</p>
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
