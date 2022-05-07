import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getEvents } from '../../store/events.js';
import { getGroups } from '../../store/groups.js';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const events = Object.values(useSelector(state => state?.events));
  const groups = Object.values(useSelector(state => state?.groups?.groups));

  const [query, setQuery] = useState('');

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
        <NavLink to="/" exact className='navlink'><i className="fa-solid fa-anchor fa-xl" /></NavLink>
      </div>
      <div id='search'>
        <input placeholder='Search' onChange={e => setQuery(e.target.value)}/>
        <div id='search-results'>
          {
          events.filter(event => {
            if (query === '') {
              return;
            } else if (event?.name?.toLowerCase().includes(query?.toLowerCase())) {
            return event
          }}).map(event => {
            return (
              <div className='event-search-card' key={event.id} >
                <NavLink to={`api/events/${event.id}`} className='event-card-link'>
                  <p>{event.name} - Event</p>
                </NavLink>
              </div>
            )
          })}
          {groups.filter(group => {
            if (query === '') {
              return;
            } else if (group?.title?.toLowerCase().includes(query?.toLowerCase())) {
            return group
            }}).map(group => {
              return (
                <div className='group-search-card' key={group.id} >
                  <NavLink to={`api/groups/${group.id}`} className='group-card-link'>
                    <p>{group.title} -Crew</p>
                  </NavLink>
                </div>
              )
            })
            }
        </div>
      </div>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
