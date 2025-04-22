import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import userPic from "../../images/Designer.png";
import "./Profile.css";

function Profile() {
    const currentUser = useSelector((state) => state.session.user);

    // Redirect to login page if the user is not logged in
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="ProfilePage">
            <div className="user-info-container">
                <span>Firstname: {currentUser.firstname}</span>
                <span>Lastname: {currentUser.lastname}</span>
                <span>Email: {currentUser.email}</span>
                <span>Username: {currentUser.username}</span>
            </div>

            <img src={userPic} alt="user-avatar" className="user-avatar" />

            <div className="ProfileLinks">
                <NavLink to={'/exercise/' } className='Probutton'>
                  Exercises  
                </NavLink>
                <NavLink to={'/workout/'} className='Probutton'>
                    Workouts
                </NavLink>
                <NavLink to={'/event/'} className='Probutton'>
                    Events
                </NavLink>
                <NavLink to={'/workout/randomizer'} className='Probutton'>
                    Randomizer
                </NavLink>
            </div>

            {/* Exercises */}
            <div className="manage-container">
                <h2>Exercises</h2>
               <NavLink className='button' to='/exercise/user'> Your Exercises</NavLink>
            </div>

            {/* Workouts */}
            <div className="manage-container">
                <h2>Workouts</h2>
                <NavLink className='button' to='/workout/user'> Your Workouts</NavLink>
            </div>

            {/* Events */}
            <div className="manage-container">
                <h2>Events</h2>
                <NavLink className='button' to='/event/user'> Your Events</NavLink>
            </div>

            {/* Comments */}
            {/* <div className="manage-container">
                <h2>Comments</h2>
                <NavLink className='button' to='/comment/user'> Your Comments</NavLink>
            </div> */}
        </div>
    );
}

export default Profile;

