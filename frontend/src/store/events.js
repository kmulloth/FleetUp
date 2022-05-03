import  { csrfFetch } from './csrf';

const GET_EVENT = '/events/GET_EVENT';
const GET_ALL_EVENTS = 'events/GET_ALL_EVENTS';
const ADD_EVENT = 'events/ADD_EVENT';
const EDIT_EVENT = 'events/EDIT_EVEN';
const DELETE_EVENT = 'events/DELETE_EVENT';

export const getEvent = event => {
    return {
        type: GET_EVENT,
        payload: event
    }
};

export const getAllEvents = (events) => {
    return {
        type: GET_ALL_EVENTS,
        payload: events
    }
}
export const getOneEvent = id => async dispatch => {
   const response = csrfFetch(`/api/events/${id}`);

   if (response.ok) {
    const event = response.json();
    dispatch(getEvent(event));
   }
}
export const getEvents = () => async dispatch => {
  const response = await csrfFetch(`/api/events/all`);
  console.log('HIT!!!')

  if (response.ok) {
    const events = await response.json();
    dispatch(getAllEvents(events));
    return events;
  }
};

export const addEvent = event => {
    return {
        type: ADD_EVENT,
        payload: event
    };
};

export const editEvent = event => {
    return {
        type: EDIT_EVENT,
        payload: event
    };
};

export const deleteEvent = () => {
    return {
        type: DELETE_EVENT,
    };
};


let initialState = {events: []};

const eventReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case GET_EVENT:
        newState = {...state};
        newState.events = action.payload;
        return newState;
      case GET_ALL_EVENTS:
        newState = {...state};
        newState.events = action.payload;
        return newState;
      case ADD_EVENT:
        newState = Object.assign({}, state);
        newState.events = action.payload;
        return newState;
      case EDIT_EVENT:
        newState = Object.assign({}, state);
        newState.events = action.payload;
        return newState;
      case DELETE_EVENT:
        newState = Object.assign({}, state);
        newState.events = null;
        return newState;
      default:
        return state;
    }
  };

export default eventReducer;
