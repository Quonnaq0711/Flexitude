import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserWorkout.css';

const UserWorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch workouts from the backend
  useEffect(() => {
    fetch('/api/workout/user')
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Failed to fetch workouts');
      })
      .then((data) => {
        if (data.workouts) {
          setWorkouts(data.workouts);
        } else {
          setError(data.message || 'No workouts found.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Error fetching workouts.');
        setLoading(false);
      });
  }, []);

  // Handle navigate to update page
  const handleUpdateClick = (workoutId) => {
    navigate(`/workout/update/${workoutId}`);
  };

  // Handle delete request
  const handleDeleteClick = (workoutId) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      fetch(`/api/workout/delete/${workoutId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'workout deleted successfully') {
            alert('workout deleted successfully!');
            setWorkouts(workouts.filter((workout) => workout.id !== workoutId));
          } else {
            alert('Error deleting workout');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('There was an error deleting the workout');
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const back1 = () => {
    navigate('/user/profile')
  }

  return (
    <>
      <button className='back' onClick={back1}>Back</button>
    <div className='div'>
      <h2>Your Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <h3>{workout.title}</h3>
            <p className='p'>Exercise Type: {workout.exercise_type}</p>
            <p className='p'>Description: {workout.description}</p>
            {/* <p className='p'>
              {workout.exercises && workout.exercises.length > 0
                ? workout.exercises.map((exercise, index) => (
                    <span key={index}>{exercise.name}</span>
                  ))
                : 'No exercises available'}
            </p> */}
            <div className='userbutton'>
              <button onClick={() => handleUpdateClick(workout.id)}>Update</button>
              <button onClick={() => handleDeleteClick(workout.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      </div>
      </>
  );
};

export default UserWorkoutList;
