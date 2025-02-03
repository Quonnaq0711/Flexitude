import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateWorkoutForm = () => {
  const { workoutid } = useParams(); // Get the workout ID from the URL
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    exercise_type: '',
    exercises: ['', '', '', '', '', ''], // Array for up to 6 exercises
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
    
    const exercise_types = [
        'Abdominal Exercises', 'Agility Drills', 'CrossFit', 'HIIT', 'Stretching', 
        'Cardio', 'Strength Training', 'Weightlifting', 'Bodyweight', 'Other'
      ];

  // Fetch available exercises and workout data on component mount
  useEffect(() => {
    const fetchExercisesAndWorkout = async () => {
      try {
        // Fetch exercises
        const exerciseResponse = await fetch('/api/exercise/');
        if (!exerciseResponse.ok) {
          throw new Error('Failed to fetch exercises');
        }
        const exerciseData = await exerciseResponse.json();
        setExercises(exerciseData.exercises);

        // Fetch the existing workout data
        const workoutResponse = await fetch(`/api/workout/${workoutid}`);
        if (!workoutResponse.ok) {
          throw new Error('Failed to fetch workout');
        }
        const workoutData = await workoutResponse.json();
        setFormData({
          title: workoutData.title,
          description: workoutData.description,
          exercise_type: workoutData.exercise_type,
          exercises: workoutData.exercises.map((exercise) => exercise.id),
        });
      } catch (error) {
        setErrors({ fetch: error.message });
      }
    };

    fetchExercisesAndWorkout();
  }, [workoutid]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle exercise selection
  const handleExerciseChange = (e, index) => {
    const updatedExercises = [...formData.exercises];
    updatedExercises[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      exercises: updatedExercises,
    }));
  };

  // Validate the form before submission
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.exercise_type) newErrors.exercise_type = 'Exercise type is required';
    if (formData.exercises.every(exercise => exercise === '')) newErrors.exercises = "At least one exercise must be selected";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors({});
    setMessage('');

    // Validate the form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }
console.log('ID',workoutid)
    // Prepare the data for submission
    const workoutData = {
      title: formData.title,
      description: formData.description,
      exercise_type: formData.exercise_type,
      exercises: formData.exercises.filter((id) => id !== '').map(exercise => Number(exercise)),
    };

    try {
      const response = await fetch(`/api/workout/update/${workoutid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
      });

      const data = await response.json();

      if (data.message === 'Workout updated successfully') {
        setMessage('Workout updated successfully!');
        navigate(`/workout/${workoutid}`); // Redirect to the workout details page
      } else {
        setErrors(data.errors || {});
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const back = () => {
    navigate('/workout/user')
  }

  return (
      
    <div className="update-workout-form">
      <button className='back' onClick={back}>Back</button>  
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Update Workout</h2>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div>
          <label>Exercise Type</label>
          <select
            name="exercise_type"
            value={formData.exercise_type}
            onChange={handleChange}
            required
          >
            <option value="">Select exercise type</option>
            {exercise_types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.exercise_type && <p className="error">{errors.exercise_type}</p>}
        </div>

        <div>
          <label>Exercises (up to 6)</label>
          {formData.exercises.map((exercise, index) => (
            <select
              key={index}
              name={`exercise-${index}`}
              value={exercise}
              onChange={(e) => handleExerciseChange(e, index)}
            >
              <option value="">Select an exercise</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
          ))}
          {errors.exercises && <p className="error">{errors.exercises}</p>}
        </div>

        {errors.general && <p className="error">{errors.general}</p>}

        {message && <p className="success">{message}</p>}

        <button  className='b3' type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Workout'}
        </button>
        
      </form>
    </div>
    
  );
};

export default UpdateWorkoutForm;
