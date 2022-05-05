import {csrfFetch} from './csrf';

const GET_GROUP = '/groups/GET_GROUP';
const GET_ALL_GROUPS = 'groups/GET_ALL_GROUPS';
const ADD_GROUP = 'groups/ADD_GROUP';
const EDIT_GROUP = 'groups/EDIT_GROUP';
const DELETE_GROUP = 'groups/DELETE_GROUP';

export const getGroup = group => {
    return {
        type: GET_GROUP,
        payload: group
    }
}

export const getAllGroups = (groups) => {
    return {
        type: GET_ALL_GROUPS,
        payload: groups
    }
}

export const getOneGroup = id => async dispatch => {
    const response = await csrfFetch(`/api/groups/${id}`);

    if (response.ok) {
     const group = response.json();
     dispatch(getGroup(group));
    }
}

export const getGroups = () => async dispatch => {
    const response = await csrfFetch(`/api/groups/all`);

    if (response.ok) {
        const groups = await response.json();
        dispatch(getAllGroups(groups));
        return groups;
    }
}

let initialState = {groups: []};

const groupsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_GROUP:
            newState = {...state};
            newState.groups = action.payload;
            return newState;
        case GET_ALL_GROUPS:
            newState = {...state};
            newState.groups = action.payload;
            return newState;
        case ADD_GROUP:
            newState = {...state};
            newState.groups.push(action.payload);
            return newState;
        case EDIT_GROUP:
            newState = {...state};
            newState.groups = action.payload
            return newState;
        case DELETE_GROUP:
            newState = {...state};
        default:
            return state;
    }
}

export default groupsReducer;
