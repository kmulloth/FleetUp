const ADD_EVENT = 'events/addEvent';
const EDIT_EVENT = 'events/edit';
const DELETE_EVENT = 'events/delete';

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

// export const getEvents = () => async dispatch => {
//   const response = await fetch(`/events`);

//   if (response.ok) {
//     const list = await response.json();
//     dispatch(load(list));
//   }
// };

const eventReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
      case ADD_EVENT:
        newState = Object.assign({}, state);
        newState.event = action.payload;
        return newState;
      case EDIT_EVENT:
        newState = Object.assign({}, state);
      case DELETE_EVENT:
        newState = Object.assign({}, state);
        newState.user = null;
        return newState;
      default:
        return state;
    }
  };

export default eventReducer;
