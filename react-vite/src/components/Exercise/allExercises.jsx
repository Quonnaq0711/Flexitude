import { useState, useEffect } from 'react'; 
import { NavLink } from 'react-router-dom';
import './allExercises.css';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className='list'>
      <h1>Exercise List</h1>
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


