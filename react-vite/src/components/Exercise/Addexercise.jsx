import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createExercise } from '../../redux/exercise';
import { useNavigate, NavLink } from 'react-router-dom';
import './AddExerciseForm.css';

const AddExerciseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.session.user.id);

  // Define dynamic muscle groups (can fetch from API if necessary)
  const musclegroups = ['Arms', 'Shoulders', 'Chest', 'Abdominals', 'Butt/Legs',
    'Agility Drills', 'CrossFit', 'HIIT', 'Stretching',
    'Strength Training', 'Weightlifting', 'Bodyweight',
    'Other'
   ];

  // Predefined options for sets, reps, and time
  const SETS = ['0','1', '2', '3', '4', '5', '6','7', '8', '9', '10'];
  const REPS = ['0','1', '2', '3', '4', '5', '6','7', '8', '9', '10', '11', '12', '13', '14', '15', '16','17', '18', '19', '20', '21', '22', '23', '24', '25', '26','27', '28', '29', '30'];
  const TIME = ['0', '30 SECONDS','45 SECONDS','60 SECONDS','2 MINUTES','5 MINUTES', '10 MINUTES','15 MINUTES','20 MINUTES','25 MINUTES','30 MINUTES'];

  
  // Form data and error state
    const [exerciseData, setExerciseData] = useState({
    id: currentUser,
    name: '',
    instructions: '',
    musclegroup: '',
    equipment: '',
    sets: '',
    reps: '',
    time: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before submitting

    try {
      // Dispatch createExercise action
      await dispatch(createExercise(exerciseData));
      navigate('/exercise/'); 
    } catch (error) {
      console.error('Error creating exercise', error);
      setErrors(error.errors || { general: 'Something went wrong' }); 
    }
  };

  

//   const random = () => {
//     alert('Feature Coming Soon...')
// }

  return (
    <>
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
    <div className="add-exercise-form">      
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Add New Exercise</h2>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={exerciseData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Instructions</label>
          <textarea
            name="instructions"
            value={exerciseData.instructions}
            onChange={handleChange}
            required
          />
          {errors.instructions && <p className="error">{errors.instructions}</p>}
        </div>

        <div>
          <label>Muscle Group</label>
          <select
            name="musclegroup"
            value={exerciseData.musclegroup}
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
          {errors.musclegroup && <p className="error">{errors.musclegroup}</p>}
        </div>

        <div>
          <label>Equipment</label>
          <input
            type="text"
            name="equipment"
            value={exerciseData.equipment}
            onChange={handleChange}
            required
          />
          {errors.equipment && <p className="error">{errors.equipment}</p>}
        </div>

        <div>
          <label>Sets</label>
          <select
            name="sets"
            value={exerciseData.sets}
            onChange={handleChange}
            required
          >
            {SETS.map((set) => (
              <option key={set} value={set}>
                {set}
              </option>
            ))}
          </select>
          {errors.sets && <p className="error">{errors.sets}</p>}
        </div>

        <div>
          <label>Reps</label>
          <select
            name="reps"
            value={exerciseData.reps}
            onChange={handleChange}
            required
          >
            {REPS.map((rep) => (
              <option key={rep} value={rep}>
                {rep}
              </option>
            ))}
          </select>
          {errors.reps && <p className="error">{errors.reps}</p>}
        </div>

        <div>
          <label>Time</label>
          <select
            name="time"
            value={exerciseData.time}
            onChange={handleChange}
            required
          >
            {TIME.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.time && <p className="error">{errors.time}</p>}
        </div>

        {errors.general && <p className="error">{errors.general}</p>}
        <button className='b3' type="submit">Add Exercise</button>
      </form>
      </div>
    </>
  );
};

export default AddExerciseForm;