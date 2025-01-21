import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserExercise.css';

const UserExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch exercises from the backend
  useEffect(() => {
    fetch('/api/exercise/user')
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Failed to fetch exercises');
      })
      .then((data) => {
        if (data.exercises) {
          setExercises(data.exercises);
        } else {
          setError(data.message || 'No exercises found.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Error fetching exercises.');
        setLoading(false);
      });
  }, []);

  // Handle navigate to update page
  const handleUpdateClick = (exerciseId) => {
    navigate(`/exercise/update/${exerciseId}`);
  };

  // Handle delete request
  const handleDeleteClick = (exerciseId) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      fetch(`/api/exercise/delete/${exerciseId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Exercise deleted successfully') {
            alert('Exercise deleted successfully!');
            setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
          } else {
            alert('Error deleting exercise');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('There was an error deleting the exercise');
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='div'>
      <h2>Your Exercises</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <h3>{exercise.name}</h3>
                <p className='p' >Muscle Group: {exercise.musclegroup}</p>
                <p className='p' >Instructions: {exercise.instructions}</p>
                <p className='p' >Equipment: {exercise.equipment}</p>
                <p className='p' >Sets: {exercise.sets}</p>
                <p className='p' >Reps: {exercise.reps}</p>
                <p className='p' >Time: {exercise.time}</p>
                <div className='userbutton' >
            <button onClick={() => handleUpdateClick(exercise.id)}>Update</button>
            <button onClick={() => handleDeleteClick(exercise.id)}>Delete</button>
                </div>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default UserExerciseList;
