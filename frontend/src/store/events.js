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
  dispatch(getEvents())
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
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EVENTS:
          console.log('SOME TEXT', action.payload)
          const allEvents = {}
            action.payload.forEach((event) => {
                if (event.id) allEvents[event.id] = event
            })
            return { ...allEvents }
        case EDIT_EVENT:
            const newEditState = {
              ...state,
              [action.payload.event.id]: action.payload.event
            }
            // const eventList = newState.map(id => newState[id]);
            // eventList.push(action.payload)
            return newEditState

        case ADD_EVENT:

            const newAddState = {
              ...state,
              [action.payload.event.id]: action.payload.event
            }
            // newState[action.payload.event.id]= action.payload
            // const eventList = newState.map(id => newState[id]);
            // eventList.push(action.payload)
            return newAddState
        case DELETE_EVENT:
          const newDeleteState = {...state}
          delete newDeleteState[action.payload]
          return newDeleteState

        default:
            return state;
    }
};

export default eventReducer;
