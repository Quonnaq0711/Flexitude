const LOAD_EXERCISE = 'loadExercise';
const GET_EXERCISE_DETAILS = 'getExerciseDetails';
const UPDATE_EXERCISE = 'updateExercise';
const DELETE_EXERCISE = 'deleteExercise';
const ADD_EXERCISE = 'addexercise';
const USER_EXERCISE = 'userExercise';
const MUSCLE_GROUP = 'muscleGroup';

export const loadExercise = (exercises) => ({
    type: LOAD_EXERCISE,
    payload: exercises
});

export const getExerciseDetails = (exerciseid) => ({
    type: GET_EXERCISE_DETAILS,
    payload: exerciseid  // Send only the ID to fetch the correct exercise in the reducer
});

export const addexercise = (exercise) => ({
    type: ADD_EXERCISE,
    exercise
});

export const updateExercise = (exercise) => ({
    type: UPDATE_EXERCISE,
    exercise
});

export const deleteExercise = (exerciseid) => ({
    type: DELETE_EXERCISE,
    exerciseid
});

export const userExercise = (userId, exercises) => ({
    type: USER_EXERCISE,
    userId,
    exercises
});

export const muscleGroup = (musclegroup, exercises) => ({
    type: MUSCLE_GROUP,
    musclegroup,
    exercises
});

export const getExercises = () => async (dispatch) => {
    const response = await fetch('/api/exercise/');
    if (response.ok) {
        const exercises = await response.json();
        dispatch(loadExercise(exercises)); 
    } else {
        const error = await response.json();
        console.error('Problem getting exercises', error);
    }
};

export const exerciseDetails = (exerciseid) => async (dispatch) => {
    const response = await fetch(`/api/exercise/${exerciseid}`); 
    if (response.ok) {
        const details = await response.json();
        dispatch(getExerciseDetails(details.id));  // Dispatch only the ID of the exercise
    } else {
        const error = await response.json();
        console.error('Problem with get details for exercise', error);
    }
};

export const fetchuserExercise = (userId) => async (dispatch) => {
    const response = await fetch('/api/exercise/user');
    if (response.ok) {
        const { exercises } = await response.json();
        dispatch(userExercise(userId, exercises)); 
    } else {
        const error = await response.json();
        console.error("Error getting user exercises", error);
    }    
};

export const ExercisesByMuscleGroup = (musclegroup) => async (dispatch) => {
    const response = await fetch(`/api/exercise/musclegroup/${musclegroup}`);
    if (response.ok) {
        const exercises = await response.json();
        dispatch(muscleGroup(musclegroup, exercises)); 
    } else {
        const error = await response.json();
        console.error("Error fetching exercises by muscle group", error);
    }
};

export const createExercise = (exerciseData) => async (dispatch) => {
    const response = await fetch('/api/exercise/new', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exerciseData),
    });
    
    if (response.ok) {
        const exercise = await response.json();
        dispatch(addexercise(exercise)); 
    } else {
        const error = await response.json();
        console.error('Problem creating exercise', error);
    }
};

export const changeExercise = (exerciseid, exerciseData) => async (dispatch) => {
    const response = await fetch(`/api/exercise/update/${exerciseid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exerciseData),
    });

    if (response.ok) {
        const updatedExercise = await response.json();
        dispatch(updateExercise(updatedExercise)); 
    } else {
        const error = await response.json();
        console.error('Problem updating exercise', error);
    }
};

export const removeExercise = (exerciseid) => async (dispatch) => {
    const response = await fetch(`/api/exercise/delete/${exerciseid}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteExercise(exerciseid));
    } else {
        const error = await response.json();
        console.error('Problem deleting exercise', error)
    }
};

const initialState = { exercises: [], currentExercise: null };

const exerciseReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_EXERCISE:
            return {
                ...state,
                exercises: action.payload
            };
        case GET_EXERCISE_DETAILS:
            return {
                ...state,
                currentExercise: state.exercises.find(exercise => exercise.id === action.payload)
            };
        case ADD_EXERCISE:
            return {
                ...state,
                exercises: [...state.exercises, action.exercise]
            };
        case UPDATE_EXERCISE:
            return {
                ...state,
                exercises: state.exercises.map(exercise => 
                    exercise.id === action.exercise.id ? action.exercise : exercise
                )
            };
        case DELETE_EXERCISE:
            return {
                ...state,
                exercises: state.exercises.filter(exercise => exercise.id !== action.exerciseid)
            };
        case USER_EXERCISE:
            return {
                ...state,
                exercises: action.exercises
            };
        case MUSCLE_GROUP:
            return {
                ...state,
                exercises: action.exercises
            };
        default:
            return state;
    }
};

export default exerciseReducer;


