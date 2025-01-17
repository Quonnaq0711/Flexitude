const LOAD_WORKOUT = 'loadWorkout';
const WORKOUT_DETAILS = 'workoutDetails';
const ADD_WORKOUT = 'addWorkout';
const UPDATE_WORKOUT = 'updateWorkout';
const USER_WORKOUT = 'userWorkout';
const DELETE_WORKOUT = 'deleteWorkout';

export const loadWorkout = (workouts) => ({
    type: LOAD_WORKOUT,
    workouts // Payload is 'workouts'
});

export const workoutDetails = (workout) => ({
    type: WORKOUT_DETAILS,
    workout // The payload will be the workout object itself
});

export const addWorkout = (workout) => ({
    type: ADD_WORKOUT,
    workout
});

export const updateWorkout = (workout) => ({
    type: UPDATE_WORKOUT,
    workout
});

export const userWorkout = (userid, workout) => ({
    type: USER_WORKOUT,
    userid,
    workout
});

export const deleteWorkout = (workoutid) => ({
    type: DELETE_WORKOUT,
    workoutid
});

export const getWorkouts = () => async (dispatch) => {
    const response = await fetch('/api/workout/');
    if (response.ok) {
        const workouts = await response.json();
        dispatch(loadWorkout(workouts));  //  dispatch workouts
    } else {
        const error = await response.json();
        console.error("Problem with loading workouts", error);
    }
};

export const getWorkoutDetails = (workoutid) => async (dispatch) => {
    const response = await fetch(`/api/workout/${workoutid}`);
    if (response.ok) {
        const workout = await response.json();
        dispatch(workoutDetails(workout));  // Dispatch the workout details
    } else {
        const error = await response.json();
        console.error("Problem with getting this workout", error);
    }
};

export const fetchUserWorkouts = (userid) => async (dispatch) => {
    const response = await fetch(`/api/workout/user/${userid}`);
    if (response.ok) {
        const { workouts } = await response.json();  
        dispatch(userWorkout(userid, workouts));  // Pass the workouts array to the action
    } else {
        const error = await response.json();
        console.error("Problem with getting your workouts", error);
    }
};

export const createWorkout = (workoutData) => async (dispatch) => {
    const response = await fetch('/api/workout/new', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutData),
    });
    if (response.ok) {
        const newWorkout = await response.json();
        dispatch(addWorkout(newWorkout));  // Add new workout to the state
    } else {
        const error = await response.json();
        console.error("Problem with creating this workout", error);
    }
};

export const changeWorkout = (workoutid, workoutData) => async (dispatch) => {
    const response = await fetch(`/api/workout/update/${workoutid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutData),
    });
    if (response.ok) {
        const updatedWorkout = await response.json();
        dispatch(updateWorkout(updatedWorkout));  // Update the workout in the state
    } else {
        const error = await response.json();
        console.error("Problem with updating this workout", error);
    }
};

export const removeWorkout = (workoutid) => async (dispatch) => {
    const response = await fetch(`/api/workout/${workoutid}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteWorkout(workoutid));  // Remove the workout from the state
    } else {
        const error = await response.json();
        console.error('Problem deleting this workout', error);
    }
};

const initialState = { workouts: [], currentWorkout: null };

const workoutReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_WORKOUT:
            return {
                ...state,
                workouts: action.workouts  
            };
        case WORKOUT_DETAILS:
            return {
                ...state,
                currentWorkout: action.workout  // Store details of the workout
            };
        case ADD_WORKOUT:
            return {
                ...state,
                workouts: [...state.workouts, action.workout]  // Add the new workout to the list
            };
        case UPDATE_WORKOUT:
            return {
                ...state,
                workouts: state.workouts.map(workout =>
                    workout.id === action.workout.id ? action.workout : workout
                )  // Update the workout in the state
            };
        case USER_WORKOUT:
            return {
                ...state,
                userWorkouts: action.workout  // store the user's workout here
            };
        case DELETE_WORKOUT:
            return {
                ...state,
                workouts: state.workouts.filter(workout => workout.id !== action.workoutid)  // Remove the workout by id
            };
        default:
            return state;
    }
};

export default workoutReducer;
