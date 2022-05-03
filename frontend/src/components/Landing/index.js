import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getEvents } from '../../store/events.js';
import eventCard from '../EventCard/index.js';

import './landing.css'

function Landing () {

    // const [eventArr, setEventArr] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const events = useSelector(state => state.events.events);

    // console.log(sessionUser,);

    useEffect(() => {
        dispatch(getEvents({include: [{model: 'User'}]}));
    }, [dispatch]);

    // useEffect(() => {
    //     setEventArr(events.map(event => {
    //         return {
    //             id: event.id,
    //             title: event.title,
    //             description: event.description,
    //             date: event.date,
    //         }
    //     }))
    // }, [events]);

    return (
        <>
        <div id='landing'>
            <h1>Welcome {sessionUser.username}!</h1>
        </div>
        <div>
            <div id='events-header'>
                <h1>Events</h1>
                <NavLink to='/events/new' >Create an Event!</NavLink>
            </div>
            <div id='events-container'>
                {events.map(event => {
                    console.log(event);
                    return (
                        <eventCard key={event.id} />
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default Landing;
