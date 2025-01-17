const LOAD_EVENT = 'loadEVENT';
const EVENT_DETAILS = 'EVENTDetails';
const ADD_EVENT = 'addEVENT';
const UPDATE_EVENT = 'updateEVENT';
const USER_EVENT = 'userEVENT';
const DELETE_EVENT = 'deleteEVENT';

export const loadevent = (events) => ({
    type: LOAD_EVENT,
    events // Payload is 'events'
});

export const eventDetails = (event) => ({
    type: EVENT_DETAILS,
    event // The payload will be the event object 
});

export const addevent = (event) => ({
    type: ADD_EVENT,
    event
});

export const updateevent = (event) => ({
    type: UPDATE_EVENT,
    event
});

export const userevent = (userid, events) => ({
    type: USER_EVENT,
    userid,
    events // Assuming the response contains an array of events for the user
});

export const deleteevent = (eventid) => ({
    type: DELETE_EVENT,
    eventid
});

export const getevent = () => async (dispatch) => {
    const response = await fetch('/api/event/');
    if (response.ok) {
        const events = await response.json();
        dispatch(loadevent(events));  // Dispatch the list of events
    } else {
        const error = await response.json();
        console.error("Problem with loading event", error);
    }
};

export const geteventDetails = (eventid) => async (dispatch) => {
    const response = await fetch(`/api/event/${eventid}`);
    if (response.ok) {
        const event = await response.json();
        dispatch(eventDetails(event));  // Dispatch the event details
    } else {
        const error = await response.json();
        console.error("Problem with getting this event", error);
    }
};

export const fetchUserevent = (userid) => async (dispatch) => {
    const response = await fetch(`/api/event/user/${userid}`);
    if (response.ok) {
        const { events } = await response.json();  // Expecting an array of events
        dispatch(userevent(userid, events));  // Dispatch the user's events
    } else {
        const error = await response.json();
        console.error("Problem with getting your events", error);
    }
};

export const createevent = (eventData) => async (dispatch) => {
    const response = await fetch('/api/event/new', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
    });
    if (response.ok) {
        const newevent = await response.json();
        dispatch(addevent(newevent));  // Add new event to the state
    } else {
        const error = await response.json();
        console.error("Problem with creating this event", error);
    }
};

export const changeevent = (eventid, eventData) => async (dispatch) => {
    const response = await fetch(`/api/event/update/${eventid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
    });
    if (response.ok) {
        const updatedevent = await response.json();
        dispatch(updateevent(updatedevent));  // Update the event in the state
    } else {
        const error = await response.json();
        console.error("Problem with updating this event", error);
    }
};

export const removeevent = (eventid) => async (dispatch) => {
    const response = await fetch(`/api/event/${eventid}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteevent(eventid));  // Remove the event from the state
    } else {
        const error = await response.json();
        console.error('Problem deleting this event', error);
    }
};

const initialState = { events: [], currentevent: null, userevents: [] };

const eventReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_EVENT:
            return {
                ...state,
                events: action.events  // Ensure it's 'events' from action
            };
        case EVENT_DETAILS:
            return {
                ...state,
                currentevent: action.event  // Store details of the event
            };
        case ADD_EVENT:
            return {
                ...state,
                events: [...state.events, action.event]  // Add the new event to the list
            };
        case UPDATE_EVENT:
            return {
                ...state,
                events: state.events.map(event =>
                    event.id === action.event.id ? action.event : event
                )  // Update the event in the state
            };
        case USER_EVENT:
            return {
                ...state,
                userevents: action.events  // Store the array of events for the user
            };
        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.eventid)  // Remove the event by id
            };
        default:
            return state;
    }
};

export default eventReducer;
