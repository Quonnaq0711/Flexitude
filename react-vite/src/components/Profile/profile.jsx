import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { fetchUserComments } from "../../redux/comments";
import { fetchUserevent } from "../../redux/event";
import { fetchuserExercise } from "../../redux/exercise";
import { fetchUserWorkouts } from "../../redux/workouts";
import userPic from "../../images/Designer.png";
import "./Profile.css";

function Profile() {
    // const [ exercise, setExercise ] = useState('');
    // const [ comment, setComment ] = useState('');
    // const [ workout, setWorkout ] = useState('');
    // const [ event, setEvent ] = useState('');
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    console.log("User", currentUser)
    const exercises = useSelector((state) => state.exercise === currentUser || []);
    console.log("Exercise", exercises)
    const comment = useSelector((state) => state.comments || []);
    console.log("Comment", comment)
    const event = useSelector((state) => state.events || []);
    const workout = useSelector((state) => state.workouts || []);
    console.log("Redux state:", useSelector((state) => state));  // Log the full Redux state

   
    // Redirect to login page if the user is not logged in
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    // Fetch data when the component mounts
    useEffect(() => {
        if (currentUser) {
            dispatch(fetchuserExercise(currentUser.id)); // Pass the user id
            dispatch(fetchUserWorkouts(currentUser.id)); // Pass the user id
            dispatch(fetchUserevent(currentUser.id));    // Pass the user id
            dispatch(fetchUserComments(currentUser.id)); // Pass the user id
        }
    }, [dispatch, currentUser]); // Rerun effect if currentUser changes
   
    // const exercise = Array.isArray(exercise) ? exercise : [];
    // Button handlers for updating and deleting (Define your dispatch functions accordingly)
    const dispatchUpdate = (id) => {
        console.log(`Update ${id}`);
        // Dispatch update action
    };

    const dispatchDelete = (id) => {
        console.log(`Delete ${id}`);
        // Dispatch delete action
    };

    
    return (
        <div className="ProfilePage">
            <div className="user-info-container">
                <span>Firstname: {currentUser.firstname}</span>
                <span>Lastname: {currentUser.lastname}</span>
                <span>Email: {currentUser.email}</span>
                <span>Username: {currentUser.username}</span>
            </div>

            <img src={userPic} alt="user-avatar" className="user-avatar" />

            {/* Exercises */}
            <div className="manage-container">
                <h2>Exercises</h2>
                {exercises.length > 0 ? (
                    exercises.map((ex) => (
                        <li key={ex.id}>
                            <NavLink to={`/exercise/${ex.id}`} className="result-link">
                                {ex.name}
                            </NavLink>
                            <button onClick={() => dispatchUpdate(ex.id)}>Update</button>
                            <button onClick={() => dispatchDelete(ex.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No exercises found.</p>
                )}
            </div>

            {/* Workouts */}
            <div className="manage-container">
                <h2>Workouts</h2>
                {workout.length > 0 ? (
                    workout.map((wrk) => (
                        <li key={wrk.id}>
                            <NavLink to={`/workout/${wrk.id}`} className="result-link">
                                {wrk.name}
                            </NavLink>
                            <button onClick={() => dispatchUpdate(wrk.id)}>Update</button>
                            <button onClick={() => dispatchDelete(wrk.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No workouts found.</p>
                )}
            </div>

            {/* Events */}
            <div className="manage-container">
                <h2>Events</h2>
                {event.length > 0 ? (
                    event.map((evt) => (
                        <li key={evt.id}>
                            <NavLink to={`/event/${evt.id}`} className="result-link">
                                {evt.name}
                            </NavLink>
                            <button onClick={() => dispatchUpdate(evt.id)}>Update</button>
                            <button onClick={() => dispatchDelete(evt.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </div>

            {/* Comments */}
            <div className="manage-container">
                <h2>Comments</h2>
                {comment.length > 0 ? (
                    comment.map((com) => (
                        <li key={com.id}>
                            <NavLink to={`/comment/${com.id}`} className="result-link">
                                {com.name}
                            </NavLink>
                            <button onClick={() => dispatchUpdate(com.id)}>Update</button>
                            <button onClick={() => dispatchDelete(com.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No comments found.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
