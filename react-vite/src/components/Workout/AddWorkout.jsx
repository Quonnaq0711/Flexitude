import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddWorkoutForm = () => {
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
    if (form.exercises.every(exercise => exercise === '')) formErrors.exercises = "At least one exercise must be selected";
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
        navigate('/workout/'); // Redirect to workout list or another page
      } else {
        setErrors(data.errors || {});
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
    <div className="add-workout-form">
    <div className="Links">
                      <NavLink to={'/exercise/' } className='buttonlink'>
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
      <form onSubmit={handleSubmit}>
        <h2>Create New Workout</h2>
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
          <label>Exercises (up to 8)</label>
          {form.exercises.map((exercise, index) => (
            <select
              key={index}
              name={`exercise${index}`}
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
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="error">
            {Object.values(errors).map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}

        {message && <p className="success">{message}</p>}

        <button type="submit" disabled={isSubmitting}>
          Create Workout
        </button>
      </form>
      </div>
    </>
  );
};

export default AddWorkoutForm;

