const USER_COMMENTS = 'userComments';
const EVENT_COMMENTS = 'eventComments';
const EXERCISE_COMMENTS = 'exerciseComments';
const ADD_EVENT_COMMENT = 'addEventComment';
const ADD_EXERCISE_COMMENT = 'addExerciseComment';
const UPDATE_EXERCISE_COMMENT = 'updateExerciseComment';
const UPDATE_EVENT_COMMENT = 'updateEventComment';
const DELETE_COMMENT = 'deleteComment';

export const userComments = (userid, comment) => ({
    type: USER_COMMENTS,
    userid,
    comment
});

export const eventComments = (userid, eventid, comment) => ({
    type: EVENT_COMMENTS,
    userid,
    eventid,
    comment
});

export const addEventComment = (userid, eventid, comment) => ({
    type: ADD_EVENT_COMMENT,
    userid,
    eventid,
    comment
});

export const updateEventComment = (commentid, comment) => ({
    type: UPDATE_EVENT_COMMENT,
    commentid,
    comment
});

export const exerciseComments = (userid, exerciseid, comment) => ({
    type: EXERCISE_COMMENTS,
    userid,
    exerciseid,
    comment
});

export const addExerciseComment = (userid, exerciseid, comment) => ({
    type: ADD_EXERCISE_COMMENT,
    userid,
    exerciseid,
    comment
});

export const updateExerciseComment = (commentid, comment) => ({
    type: UPDATE_EXERCISE_COMMENT,
    commentid,
    comment
});

export const deleteComment = (commentid) => ({
    type: DELETE_COMMENT,
    commentid
});

export const fetchUserComments = (userid) => async (dispatch) => {
    const response = await fetch(`/api/comment/user/${userid}`);
    if (response.ok) {
        const { comments } = await response.json();
        dispatch(userComments(userid, comments));
    } else {
        const error = await response.json();
        console.error("Problem getting user comments", error);
    }
};

export const fetchEventComments = (userid, eventid) => async (dispatch) => {
    const response = await fetch(`/api/comment/event/${eventid}`);
    if (response.ok) {
        const { comments } = await response.json();
        dispatch(eventComments(userid, eventid, comments));
    } else {
        const error = await response.json();
        console.error("Problem getting event comments", error);
    }
};

export const fetchExerciseComments = (userid, exerciseid) => async (dispatch) => {
    const response = await fetch(`/api/comment/exercise/${exerciseid}`);
    if (response.ok) {
        const { comments } = await response.json();
        dispatch(exerciseComments(userid, exerciseid, comments));
    } else {
        const error = await response.json();
        console.error("Problem getting exercise comments", error);
    }
};

export const createExerciseComment = (exerciseid, commentData) => async (dispatch) => {
    const response = await fetch(`/api/comment/exercise/${exerciseid}/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
    });
    if (response.ok) {
        const EXcomment = await response.json();
        dispatch(addExerciseComment(EXcomment));
    } else {
        const error = await response.json();
        console.error("Problem creating exercise comment", error);
    }
};

export const createEventComment = (eventid, commentData) => async (dispatch) => {
    const response = await fetch(`/api/comment/event/${eventid}/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
    });
    if (response.ok) {
        const EVcomment = await response.json();
        dispatch(addEventComment(EVcomment));  // Corrected from addExerciseComment
    } else {
        const error = await response.json();
        console.error("Problem creating event comment", error);
    }
};

export const changeEventComment = (commentid, eventid, commentData) => async (dispatch) => {
    const response = await fetch(`/api/comments/event/${eventid}/update/${commentid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
    });
    if (response.ok) {
        const updatedComment = await response.json();
        dispatch(updateEventComment(updatedComment));
    } else {
        const error = await response.json();
        console.error("Problem with updating event comment", error);
    }
};

export const changeExerciseComment = (commentid, exerciseid, commentData) => async (dispatch) => {
    const response = await fetch(`/api/comments/exercise/${exerciseid}/update/${commentid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
    });
    if (response.ok) {
        const updatedComment = await response.json();
        dispatch(updateExerciseComment(updatedComment));
    } else {
        const error = await response.json();
        console.error("Problem with updating exercise comment", error);
    }
};

export const removeComment = (commentid) => async (dispatch) => {
    const response = await fetch(`/api/comment/${commentid}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteComment(commentid));
    } else {
        const error = await response.json();
        console.error("Problem deleting comment", error);
    }
};

const initialState = { comments: [], currentComment: null };

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_COMMENTS:
            return {
                ...state,
                comments: action.comment,  
            };
        case EVENT_COMMENTS:
            return {
                ...state,
                eventComments: action.comment, 
            };
        case EXERCISE_COMMENTS:
            return {
                ...state,
                exerciseComments: action.comment,  
            };
        case ADD_EVENT_COMMENT:
        case ADD_EXERCISE_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.comment],  // Add a new comment
            };
        case UPDATE_EVENT_COMMENT:
        case UPDATE_EXERCISE_COMMENT:
            return {
                ...state,
                comments: state.comments.map((comment) =>
                    comment.id === action.comment.id ? action.comment : comment  // Update the comment
                ),
            };
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter((comment) => comment.id !== action.commentid),  // Remove comment
            };
        default:
            return state;
    }
};

export default commentReducer;
