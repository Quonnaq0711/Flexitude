import { useState, useEffect } from 'react'; 
import { NavLink } from 'react-router-dom';
import './AllWorkouts.css';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/workout/')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the response to see the structure
        if (data && Array.isArray(data.workouts)) {
          setWorkouts(data.workouts); // Set the workouts array
        } else {
          setError('No workouts found');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch workouts');
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <p className="loading-message">Loading workouts...</p>;
  }

  if (error) {
    return <p className="loading-message">{error}</p>;
  }

  return (
    <div className="list">
      <h1 className='h1'>Workout List</h1>
      <ul>
        {workouts.map(workout => (
          <div key={workout.id} className='div1' >
            <h2 className='h2'>{workout.title}</h2>
            <p className='p'>{workout.description}</p>
            <ul className='ul'>
              {workout.exercises.map(exercise => (
                <li key={exercise.id}>
                  {exercise.name} - {exercise.reps} reps x {exercise.sets} sets
                </li>
              ))}
            </ul>
            <NavLink to={`/workout/${workout.id}`} className="NavLink1">View Workout</NavLink>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutList;
