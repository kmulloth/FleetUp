import  { csrfFetch } from './csrf';

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
const deleteEvent = (id) => {
  return {
      type: DELETE_EVENT,
      payload: id
  };
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

export const getEvents = () => async dispatch => {
  const response = await csrfFetch(`/api/events/all`);

  if (response.ok) {
    const events = await response.json();
    dispatch(getAllEvents(events));
    return events;
  }
};

export const editEvent = (event) => async (dispatch) => {
  console.log(event)
  const response = await csrfFetch(`/api/events/${event?.id}`, {
      method: 'PUT',
      body: JSON.stringify(event),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const editedEvent = await response.json();
  dispatch(editOneEvent(editedEvent));
}

export const deleteOneEvent = id => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers: {
          'Content-Type': 'application/json'
      }
  });

    dispatch(deleteEvent(id));

}

const initialState = {
  list: []
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EVENTS:
          const allEvents = {}
            action.payload.forEach((event) => {
                if (event.id) allEvents[event.id] = event
            })
            return {
              ...allEvents,
              ...state
            }
        case EDIT_EVENT:
          if (!state[action.payload.id]){
            const newState = {
              ...state,
              [action.payload.event.id]: action.payload
            }
            const eventList = newState.list.map(id => newState[id]);
            eventList.push(action.payload)
            return newState
          }
        case ADD_EVENT:
            if (!state[action.payload.id]){
              const newState = {
                ...state,
                [action.payload.id]: action.payload
              }
              const eventList = newState.list.map(id => newState[id]);
              eventList.push(action.payload)
              return newState
            } else {
            return {
              ...state,
              [action.payload.id]: {
                ...state[action.payload.id],
                ...action.payload
              }
            }
          }
        case DELETE_EVENT:
          delete state.events[action.payload]
          return state

        default:
            return state;
    }
};

export default eventReducer;
