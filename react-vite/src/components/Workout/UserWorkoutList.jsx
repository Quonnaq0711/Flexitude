import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserWorkout.css';

const UserWorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Fetch workouts from the backend
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workout/user', {
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Failed to fetch workouts');
        const data = await response.json();
  
        if (Array.isArray(data.workouts)) {
          setWorkouts(data.workouts);
        }
      } catch (error) {
        console.error(error);
        setError('Error fetching workouts.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchWorkouts();
  }, []);
  

  // Handle navigate to update page
  const handleUpdateClick = (workoutId) => {
    navigate(`/workout/update/${workoutId}`);
  };

  const handleDeleteClick = (workoutId) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      setDeletingId(workoutId);
  
      fetch(`/api/workout/delete/${workoutId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete the workout');
          }
          return response.json();
        })
        .then((data) => {
          if (data.message?.toLowerCase().includes('deleted')) {
            setWorkouts((prevWorkouts) =>
              prevWorkouts.filter((workout) => workout.id !== workoutId)
            );
            setSuccessMessage('Workout deleted successfully!');
          } else {
            setErrorMessage('Error deleting workout.');
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage('There was an error deleting the workout.');
        })
        .finally(() => {
          setDeletingId(null);
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
        {workouts.length === 0 ? (
          <p className='UserList-P'>No workouts available</p>
        ) : (
          <ul>
            {workouts.map((workout) => (
              <li key={workout.id}>
                <h3>{workout.title}</h3>
                <p className='paragraph'>Exercise Type: {workout.exercise_type}</p>
                <p className='paragraph'>Description: {workout.description}</p>
  
                <div className='paragraph'>
                  {workout.exercises && workout.exercises.length > 0 ? (
                    workout.exercises.map((exercise, index) => (
                      <span key={exercise.id || index}>
                        {exercise.name}
                        {index < workout.exercises.length - 1 && ', '}
                      </span>
                    ))
                  ) : (
                    <span>No exercises available</span>
                  )}
                  {successMessage && <div className="success">{successMessage}</div>}
                  {errorMessage && <div className="error">{errorMessage}</div>}
                </div>
  
                <div className='userbutton'>
                  <button onClick={() => handleUpdateClick(workout.id)}>Update</button>
                  <button onClick={() => handleDeleteClick(workout.id)}
                    disabled={deletingId === workout.id}>
                    {deletingId === workout.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
  
}

export default UserWorkoutList;
