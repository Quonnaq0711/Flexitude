import { useState, useEffect } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import './allExercises.css';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/exercise/')
      .then(response => response.json())
      .then(data => {
        setExercises(data.exercises);
        setLoading(false);
      })
      .catch( error => {
        setError('Failed to fetch exercises');
        setLoading(false);
      });
  }, []);  

  if (loading) {
    return <p className="loading-message">Loading exercises...</p>;
  }

  if (error) {
    return <p className="loading-message">{error}</p>;
  }

  const AddExercise = () => {
    navigate('/exercise/new')
  }

//   const random = () => {
//     alert('Feature Coming Soon...')
// }

  return (
    <div className='list'>
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
                <NavLink to={'/workout/randomizer'} className='Exbutton'>
                    Randomizer
                </NavLink>
            </div>
      <h1>Exercise List</h1>
      <button className='b2' onClick={AddExercise}>Add Exercise</button>
      <ul>
        {exercises.map(exercise => (
          <NavLink key={exercise.id} to={`${exercise.id}`} className='NavLink'>
            <li>{exercise.name}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;


