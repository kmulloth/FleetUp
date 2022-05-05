import { csrfFetch } from "./csrf";

const GET_RSVP = "/rsvps/GET_RSVP";
const GET_ALL_RSVPS = "rsvps/GET_ALL_RSVPS";
const ADD_RSVP = "rsvps/ADD_RSVP";
const EDIT_RSVP = "rsvps/EDIT_RSVP";
const DELETE_RSVP = "rsvps/DELETE_RSVP";

const addRsvp = rsvp => {
    return {
        type: ADD_RSVP,
        payload: rsvp
    };
}

const editOneRsvp = rsvp => {
    return {
        type: EDIT_RSVP,
        payload: rsvp
    };
}

const deleteRsvp = (rsvp) => {
    return {
        type: DELETE_RSVP,
        payload: rsvp
    };
}

const getRsvp = rsvp => {
    return {
        type: GET_RSVP,
        payload: rsvp
    }
}

const getAllRsvps = (rsvps) => {
    return {
        type: GET_ALL_RSVPS,
        payload: rsvps
    }
}

export const createRsvp = (rsvp) => async (dispatch) => {

    // console.log(rsvp)

    const response = await csrfFetch('/api/rsvps/new', {
        method: 'POST',
        body: JSON.stringify(rsvp),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const newRsvp = await response.json();
    dispatch(addRsvp(newRsvp));
}

export const getOneRsvp = id => async dispatch => {
    const response = await csrfFetch(`/api/rsvps/${id}`);

    if (response.ok) {
        const rsvp = await response.json();
        dispatch(getRsvp(rsvp));
        return rsvp;
    }
}

export const getRsvps = () => async dispatch => {
    const response = await csrfFetch(`/api/rsvps/all`);

    if (response.ok) {
        const rsvps = await response.json();
        dispatch(getAllRsvps(rsvps));
        return rsvps;
    }
}

export const editRsvp = (rsvp) => async (dispatch) => {
    const response = await csrfFetch(`/api/rsvps/${rsvp.id}`, {
        method: 'PUT',
        body: JSON.stringify(rsvp),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const editedRsvp = await response.json();
    dispatch(editOneRsvp(editedRsvp));
}

export const deleteOneRsvp = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/rsvps/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const deletedRsvp = await response.json();
    dispatch(deleteRsvp(deletedRsvp));
}

let initialState = {rsvps: {}};

const rsvpReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_RSVP:
            newState = {...state};
            newState.rsvps = action.payload;
            return newState;
        case GET_ALL_RSVPS:
            newState = {...state};
            newState.rsvps = action.payload;
            return newState;
        case ADD_RSVP:
            newState = {...state};
            newState.rsvps = action.payload;
            return newState;
        case EDIT_RSVP:
            newState = {...state};
            newState.rsvps = action.payload;
            return newState;
        case DELETE_RSVP:
            newState = {...state};
            newState.rsvps = action.payload;
            return newState;
        default:
            return state;
    }
}

export default rsvpReducer;
