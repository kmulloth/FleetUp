import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getEvents } from '../../store/events.js';
import './landing.css'

function Landing () {

    // const [eventArr, setEventArr] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const events = Object.values(useSelector(state => state.events.events));

    // console.log(events)
    // console.log(sessionUser,);

    useEffect(() => {
        dispatch(getEvents({include: [{model: 'User'}]}));
    }, [dispatch])

    return (
        <>
        <div id='landing'>
            <h1>Welcome {sessionUser.username}!</h1>
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
                                    <img src={event?.imgUrl === null ? '/../../default.jpg' : event?.imgUrl} alt=''></img>
                                </div>
                                <div className='event-card-text'>
                                    <div className='event-card-header'>
                                        <h3>{event?.name}</h3>
                                        <p>by</p>
                                        <h4>{event?.User?.username}</h4>
                                    </div>
                                    <p>{event?.body}</p>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default Landing;
