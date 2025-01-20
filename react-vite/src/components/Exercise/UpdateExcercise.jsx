import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateExercise.css';
import { useSelector } from 'react-redux';

const UpdateExerciseForm = () => {  
  const { exerciseid } = useParams();
  const navigate = useNavigate();

  const musclegroups = ['Arms', 'Shoulders', 'Chest', 'Abdominals', 'Butt/Legs', 'Cardio'];
  const SETS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const REPS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
  const TIME = ['0', '30 SECONDS', '45 SECONDS', '60 SECONDS', '2 MINUTES', '5 MINUTES', '10 MINUTES', '15 MINUTES', '20 MINUTES', '25 MINUTES', '30 MINUTES'];

  const [exercise, setExercise] = useState({
    name: '',
    instructions: '',
    musclegroup: '',
    equipment: '',
    sets: '',
    reps: '',
    time: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = useSelector((state) => state.session.user.id);
console.log("ID", exerciseid)
  // Fetch exercise data when the component mounts (GET request)
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await fetch(`/api/exercise/update/${exerciseid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response:', response); // Debugging line

        if (!response.ok) {
          throw new Error('Failed to fetch exercise');
        }

        const data = await response.json();
        setExercise(data.exercises); // Make sure this matches the JSON key
      } catch (error) {
        
        setErrors({ fetch: error.message });
      }
    };
// console.log('Error:', error); // Debugging line
    fetchExercise();
  }, [exerciseid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors({}); // Reset previous errors
    setMessage(''); // Reset previous message

    const updatedExercise = {
      name: exercise.name,
      instructions: exercise.instructions,
      musclegroup: exercise.musclegroup,
      equipment: exercise.equipment,
      sets: exercise.sets,
      reps: exercise.reps,
      time: exercise.time,
      userid: currentUser,
    };

    console.log('Sending PUT request with body:', updatedExercise); // Debugging line

    fetch(`/api/exercise/update/${exerciseid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedExercise),
    })
      .then((response) => {
        console.log('Response:', response); // Debugging line
        if (response.ok) return response.json();
        throw new Error('Failed to update exercise');
      })
      .then((data) => {
        if (data.message === 'Exercise updated successfully') {
          setMessage('Exercise updated successfully!');
          navigate('/exercise/user');
        } else {
          setErrors(data.errors || {});
        }
      })
      .catch((error) => {
        console.error('Error:', error); // Debugging line
        setErrors({ update: error.message });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="add-exercise-form">
      <form onSubmit={handleSubmit}>
        <h2>Update Exercise</h2>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={exercise.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Instructions</label>
          <textarea
            name="instructions"
            value={exercise.instructions}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Muscle Group</label>
          <select
            name="musclegroup"
            value={exercise.musclegroup}
            onChange={handleChange}
            required
          >
            <option value="">Select a muscle group</option>
            {musclegroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Equipment</label>
          <input
            type="text"
            name="equipment"
            value={exercise.equipment}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Sets</label>
          <select
            name="sets"
            value={exercise.sets}
            onChange={handleChange}
            required
          >
            {SETS.map((set) => (
              <option key={set} value={set}>
                {set}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Reps</label>
          <select
            name="reps"
            value={exercise.reps}
            onChange={handleChange}
            required
          >
            {REPS.map((rep) => (
              <option key={rep} value={rep}>
                {rep}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Time</label>
          <select
            name="time"
            value={exercise.time}
            onChange={handleChange}
            required
          >
            {TIME.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
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
          Update Exercise
        </button>
      </form>
    </div>
  );
};

export default UpdateExerciseForm;

