import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, NavLink, useParams} from 'react-router-dom';

import './landing.css'

function Landing () {
    return (
        <>
        <div id='landing'>
            <h1>Landing Page</h1>
        </div>
        <div>Events
            {}
        </div>
        </>
    )
}

export default Landing;
