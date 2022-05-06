import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './splash.css'

function Splash() {
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();

        const credential = e.target[0].value;
        const password = e.target[1].value;

        console.log('CREDENTIAL: ',credential,'PWORD: ', password, 'E: ', e);
        return dispatch(sessionActions.login({ credential, password }))
    }

    return (
        <div id='splash'>
            <div id='splash-content'>
                <h1>FleetUp</h1>
                <p>Find Your Crew. Find Your Adventure</p>
                <div id='buttons'>
                    <div id='login'>
                        <LoginFormModal />
                        <form action='/api/session' method='POST' onSubmit={handleSubmit}>
                            <input type='hidden' name='userName' value='Demo-lition' />
                            <input type='hidden' name='password' value='password' />
                            <button type='submit'>Demo</button>
                        </form>
                    </div>
                    <SignupFormModal />
                </div>
            </div>
        </div>
    )
}

export default Splash;
