import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function WorkoutDetails() {
  const { workoutid } = useParams(); // Extract the workout ID from the URL parameters
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch workout details from the backend
    const fetchWorkout = async () => {
      try {
        const response = await fetch(`/api/workouts/${workoutid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

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
    <div>
      <h1>{workout.title}</h1>
      <p>{workout.description}</p>
      <p>Type: {workout.exercise_type}</p>
      <p>Created by: {workout.username}</p>
      <h3>Exercises:</h3>
      <ul>
        {workout.exercises.map(exercise => (
          <li key={exercise.id}>
            <h4>{exercise.name}</h4>
            <p>Equipment: {exercise.equipment}</p>
            <p>Muscle Group: {exercise.musclegroup}</p>
            <p>Instructions: {exercise.instructions}</p>
            <p>Reps: {exercise.reps}</p>
            <p>Sets: {exercise.sets}</p>
            <p>Time: {exercise.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutDetails;
