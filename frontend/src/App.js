import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Group from "./components/Groups";
import Landing from "./components/Landing";
import Splash from "./components/Splash";
import EventForm from "./components/EventForm";
import EventDetail from "./components/EventDetail";
import EditEventForm from "./components/EditEventForm";

function App() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  let homePage;
  if(sessionUser){ homePage = <Landing /> }
  else { homePage = <Splash />}

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            {homePage}
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/api/groups">
            <Group />
          </Route>
          <Route path="/api/events/new">
            <EventForm />
          </Route>
          <Route path='/api/events/:eventId' exact>
            <EventDetail />
          </Route>
          <Route path='/api/events/:eventId/edit'>
            <EditEventForm />
          </Route>
        </Switch>
      )}
      <div id='footer'>
        <ul>
          <li>
            <a href='https://github.com/kmulloth'><i className='fa-brands fa-github'></i></a>
          </li>
          <li>
            <a href='https://github.com/kmulloth'><i className='fa-brands fa-linkedin'></i></a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
