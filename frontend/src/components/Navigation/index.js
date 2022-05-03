import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
        <NavLink to="/login" className='navlink'>Log In</NavLink>
        <NavLink to="/signup" className='navlink'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <div id='nav'>
      <div>
        <NavLink exact to="/" className='navlink'>Home</NavLink>
        <NavLink to="/groups" className='navlink'>Groups</NavLink>
      </div>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
