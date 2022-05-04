import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div id='nav'>
      <div>
        <NavLink to="/" exact className='navlink'>Home</NavLink>
        <NavLink to="/api/groups" className='navlink'>Groups</NavLink>
      </div>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
