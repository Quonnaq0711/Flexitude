import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './WorkoutDetails.css';

function WorkoutDetails() {
  const { workoutid } = useParams(); // Extract the workout ID from the URL parameters
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch workout details from the backend
    const fetchWorkout = async () => {
      try {
        const response = await fetch(`/api/workout/${workoutid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // const text = await response.text(); // Get the raw response as text
        // console.log(text); // Log the raw response

        if (!response.ok) {
          throw new Error('Failed to fetch workout');
        }

        const data = await response.json();
        setWorkout(data.workouts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [workoutid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='wd' >
      <h1>{workout.title}</h1>
      <p className='p'>Description: {workout.description}</p>
      <p className='p'>Type: {workout.exercise_type}</p>
      <p className='p'>Created by: {workout.username}</p>
      <h3 className='h3' >Exercises:</h3>
      <ul>
        {workout.exercises.map(exercise => (
          <li key={exercise.id}>
            <h4>{exercise.name}</h4>
            <p className='p'>Equipment: {exercise.equipment}</p>
            <p className='p'>Muscle Group: {exercise.musclegroup}</p>
            <p className='p'>Instructions: {exercise.instructions}</p>
            <p className='p'>Reps: {exercise.reps}</p>
            <p className='p'>Sets: {exercise.sets}</p>
            <p className='p'>Time: {exercise.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutDetails;
