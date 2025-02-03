import { useState, useEffect } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import './AllWorkouts.css';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/workout/')
      .then(response => response.json())
      .then(data => {
        
        if (data && Array.isArray(data.workouts)) {
          setWorkouts(data.workouts); 
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

  const AddWorkout = () => {
    navigate('/workout/new')
  }

  const random = () => {
    alert('Feature Coming Soon...')
  }

  return (
    <div className="list">
      <div className="ExerciseLinks">
                <NavLink to={'/exercise/' } className='Exbutton'>
                  Exercises  
                </NavLink>
                <NavLink to={'/workout/'} className='Exbutton'>
                    Workouts
                </NavLink>
                <NavLink to={'/event/'} className='Exbutton'>
                    Events
                </NavLink>
                <NavLink onClick={random} className='Exbutton'>
                    Randomizer
                </NavLink>
            </div>
      <h1 className='h1'>Workout List</h1>
      <button className='b2' onClick={AddWorkout}>Add Workout</button>
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
