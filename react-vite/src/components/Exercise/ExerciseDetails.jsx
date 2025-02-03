import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ExerciseDetails.css';

function ExerciseDetails() {
  const { exerciseid } = useParams(); // Extract the exercise ID from the URL parameters
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exercise details from the backend
    const fetchExercise = async () => {
      try {
        const response = await fetch(`/api/exercise/${exerciseid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // const text = await response.text(); // Get the raw response as text
        // console.log(text); // Log the raw response

        if (!response.ok) {
          throw new Error('Failed to fetch exercise');
        }

        const data = await response.json();
        setExercise(data.exercise);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchExercise();
  }, [exerciseid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const back1 = () => {
    navigate('/exercise/')
  }

  return (
    <>
      <button className='back' onClick={back1}>Back</button>
    <div className='wd1' >
      <h1>{exercise.name}</h1>         
      <p className='p1'>Equipment: {exercise.equipment}</p>
      <p className='p1'>Muscle Group: {exercise.musclegroup}</p>
      <p className='p1'>Instructions: {exercise.instructions}</p>
      <p className='p1'>Reps: {exercise.reps}</p>
      <p className='p1'>Sets: {exercise.sets}</p>
      <p className='p1'>Time: {exercise.time}</p>     
      </div>
      </>
  );
}

export default ExerciseDetails;