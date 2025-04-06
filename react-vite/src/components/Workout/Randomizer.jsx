import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Randomizer.css'

const RandomizerForm = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    exercise_type: '',
    exercises: ['', '', '', '', '', '', '', ''],
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [numExercises, setNumExercises] = useState(8); // New state for number of exercises
  const currentUser = useSelector((state) => state.session.user.id);

  const exercise_types = ['Arms', 'Shoulders', 'Chest', 'Abs', 'Butt', 'Legs',
    'Agility Drills', 'CrossFit', 'HIIT', 'Stretching',
    'Strength Training', 'Weightlifting', 'Bodyweight',
    'Other'
  ];

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('/api/exercise/', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Failed to fetch exercises');
        const data = await response.json();
        setExercises(data.exercises);
      } catch (error) {
        setErrors({ fetch: error.message });
      }
    };

    fetchExercises();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleExerciseChange = (e, index) => {
    const updatedExercises = [...form.exercises];
    updatedExercises[index] = e.target.value;
    setForm((prevState) => ({
      ...prevState,
      exercises: updatedExercises,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!form.title) formErrors.title = "Title is required";
    if (!form.description) formErrors.description = "Description is required";
    if (!form.exercise_type) formErrors.exercise_type = "Exercise type is required";
    if (form.exercises.length === 0) formErrors.exercises = "No Exercises Available";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setMessage('');

    const newWorkout = {
      title: form.title,
      description: form.description,
      exercise_type: form.exercise_type,
      exercises: form.exercises.filter(exercise => exercise !== '').map(exercise => Number(exercise)),
      userId: currentUser,
    };

    try {
      const response = await fetch('/api/workout/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorkout),
      });

      const data = await response.json();

      if (data.message === 'Workout created successfully') {
        setMessage('Workout created successfully!');
        navigate('/workout/'); // Redirect to workout list
      } else {
        setErrors(data.errors || {});
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const randomizeExercises = () => {
    if (!form.exercise_type) {
      setErrors({ exercise_type: 'Please select an exercise type' });
      return;
    }

    const filteredExercises = exercises.filter(
      (exercise) => exercise.musclegroup === form.exercise_type
    );

    if (filteredExercises.length === 0) {
      setErrors({ exercise_type: 'No exercises available for this type' });
      return;
    }

    // Randomly select exercises up to the number selected by the user
    const selectedExercises = [];
    const totalExercises = Math.min(numExercises, filteredExercises.length);

    while (selectedExercises.length < totalExercises) {
      const randomIndex = Math.floor(Math.random() * filteredExercises.length);
      const selectedExercise = filteredExercises[randomIndex];
      if (!selectedExercises.includes(selectedExercise.id)) {
        selectedExercises.push(selectedExercise.id);
      }
    }

    setForm((prevState) => ({
      ...prevState,
      exercises: selectedExercises,
    }));
    setErrors({});
  };

  const handleClear = (e) => {
    e.preventDefault();
    setForm((prevState) => ({
      ...prevState,
      exercises: ['', '', '', '', '', '', '', ''],
    }));
    setErrors({});
  };

  return (
    <>
      <div className="add-workout-form">
        <div className="RamLinks">
          <NavLink to={'/exercise/'} className='buttonlink'>
            Exercises
          </NavLink>
          <NavLink to={'/workout/'} className='buttonlink'>
            Workouts
          </NavLink>
          <NavLink to={'/event/'} className='buttonlink'>
            Events
          </NavLink>
          <NavLink to={'/workout/randomizer'} className='buttonlink'>
            Randomizer
          </NavLink>
        </div>
        <div className='wd2'>
          <h3>Instructions</h3>
          <span>To create a new workout with randomly selected exercises, follow these steps:</span>
          <p className='p2'>1. Select Exercise Type: Choose a workout category, such as Abdominal Exercises, Cardio, HIIT, or Strength Training. This will define the type of exercises you can include in your workout.</p>
          <p className='p2'>2. Randomize Exercises: After selecting an exercise type, click the Randomizer button to automatically select random exercises from the chosen category. You can get up to 8 exercises randomly selected, ensuring variety and surprise in your workout.</p>
          <p className='p2'>3. Customize Workout: The selected exercises will be automatically populated in your workout plan. You can tweak the number of exercises or choose from the available options.</p>
          <p className='p2'>4. Save Your Workout: After finalizing the workout, click Save Workout to save your new routine. Your workout will be saved with a title, description, and the list of selected exercises.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Create a New Randomized Workout</h2>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Exercise Type</label>
            <select
              name="exercise_type"
              value={form.exercise_type}
              onChange={handleChange}
              required
            >
              <option value="">Select an exercise type</option>
              {exercise_types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Number of Exercises</label>
            <select
              name="numExercises"
              value={numExercises}
              onChange={(e) => setNumExercises(Number(e.target.value))}
            >
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <button type="button" onClick={randomizeExercises}>
            Randomize Workout
          </button>

          <div>
            <label>Exercises</label>
            {form.exercises.map((exerciseId, index) => (
              <div key={index}>
                <select
                  name={`exercise${index}`}
                  value={exerciseId}
                  onChange={(e) => handleExerciseChange(e, index)}
                >
                  <option value="">Select an exercise</option>
                  {exercises.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {Object.keys(errors).length > 0 && (
            <div className="error">
              {Object.values(errors).map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
          )}

          {message && <p className="success">{message}</p>}

          <button className='clear-btn' onClick={handleClear}>Clear</button>

          <button type="submit" disabled={isSubmitting}>
            Save Workout
          </button>
        </form>
      </div>
    </>
  );
};

export default RandomizerForm;






/*
const handleClear = (e) => {
    e.preventDefault();  // Prevent form submission
    setForm((prevState) => ({
        ...prevState,
        exercises: ['', '', '', '', '', '', '', ''], // Reset exercises as well
    }));
    setErrors({});
};



const randomizeExercises = () => {
    if (!form.exercise_type) {
        setErrors({ exercise_type: 'Please select an exercise type' });
        return;
    }

    const filteredExercises = exercises.filter(
        (exercise) => exercise.musclegroup === form.exercise_type
    );

    if (filteredExercises.length === 0) {
        setErrors({ exercise_type: 'No exercises available for this type' });
        return;
    }

    // Shuffle the filteredExercises array
    const shuffledExercises = [...filteredExercises].sort(() => Math.random() - 0.5);

    // Select up to 8 exercises
    const selectedExercises = shuffledExercises.slice(0, 8).map((exercise) => exercise.id);

    setForm((prevState) => ({
        ...prevState,
        exercises: selectedExercises,
    }));
    setErrors({});
};



const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchExercises = async () => {
        try {
            const response = await fetch('/api/exercise/', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error('Failed to fetch exercises');
            const data = await response.json();
            setExercises(data.exercises);
        } catch (error) {
            setErrors({ fetch: error.message });
        } finally {
            setLoading(false); // Set loading to false when fetch is complete
        }
    };

    fetchExercises();
}, []);


{loading && <p>Loading exercises...</p>}


<button type="button" onClick={handleSubmit} disabled={isSubmitting || Object.keys(errors).length > 0}>
    Save Workout
</button>



if (data.message === 'Workout created successfully') {
    setMessage('Workout created successfully!');
    navigate('/workout/'); // Redirect to workout list
} else {
    setErrors(data.errors || {});
}
 */