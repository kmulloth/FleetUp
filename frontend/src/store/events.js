import  { csrfFetch } from './csrf';

const GET_EVENT = '/events/GET_EVENT';
const GET_ALL_EVENTS = 'events/GET_ALL_EVENTS';
const ADD_EVENT = 'events/ADD_EVENT';
const EDIT_EVENT = 'events/EDIT_EVEN';
const DELETE_EVENT = 'events/DELETE_EVENT';

const addEvent = event => {
  return {
      type: ADD_EVENT,
      payload: event
  };
};
const editOneEvent = event => {
  return {
      type: EDIT_EVENT,
      payload: event
  };
};
const deleteEvent = () => {
  return {
      type: DELETE_EVENT,
  };
};
const getEvent = event => {
    return {
        type: GET_EVENT,
        payload: event
    }
};
const getAllEvents = (events) => {
    return {
        type: GET_ALL_EVENTS,
        payload: events
    }
}
export const createEvent = (event) => async (dispatch) => {
  const response = await csrfFetch('/api/events/new', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const newEvent = await response.json();
  dispatch(addEvent(newEvent));
}

export const getOneEvent = id => async dispatch => {
  const response = await csrfFetch(`/api/events/${id}`);

  console.log(response)
  if (response.ok) {
    const event = await response.json();
    dispatch(getEvent(event));
    return event;
  }
}
export const getEvents = () => async dispatch => {
  const response = await csrfFetch(`/api/events/all`);

  if (response.ok) {
    const events = await response.json();
    dispatch(getAllEvents(events));
    return events;
  }
};

export const editEvent = (event) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${event.id}`, {
      method: 'PUT',
      body: JSON.stringify(event),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const editedEvent = await response.json();
  dispatch(editOneEvent(editedEvent));
}

let initialState = {events: {}};

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
        newState = {...state};
        // newState.events = action.payload;
        return newState;
      case EDIT_EVENT:
        newState = {...state};
        newState.events = action.payload;
        return newState;
      case DELETE_EVENT:
        newState = {...state};
        newState.events = null;
        return newState;
      default:
        return state;
    }
  };

export default eventReducer;
