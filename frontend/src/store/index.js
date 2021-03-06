import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { restoreCSRF, csrfFetch } from './csrf';
import sessionReducer from './session';
import * as sessionActions from './session';
import eventReducer from './events';
import * as eventActions from './events';
import groupsReducer from './groups';
import * as groupsActions from './groups';
import rsvpReducer from './rsvps';
import * as rsvpActions from './rsvps';

const rootReducer = combineReducers({
  session: sessionReducer,
  events: eventReducer,
  groups: groupsReducer,
  rsvps: rsvpReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
    restoreCSRF();

    window.csrfFetch = csrfFetch;
    window.store = store;
    window.sessionActions = sessionActions;
    window.eventActions = eventActions;
    window.groupsActions = groupsActions;
    window.rsvpActions = rsvpActions;
  }

export default configureStore;
