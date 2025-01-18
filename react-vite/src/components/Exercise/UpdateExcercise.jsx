import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeExercise } from '../../redux/exercise';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateExercise.css';

const UpdateExerciseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exerciseid } = useParams();
  const currentUser = useSelector((state) => state.session.user.id);
  // console.log("Currentuser", currentUser);
  const exercise = useSelector((state) =>
    Array.isArray(state.exercise) ? state.exercise.find((ex) => ex.id === exerciseid) : {}
  );
    console.log("Exercise", exercise.data)
    console.log("ExerciseId", exerciseid)
//   const exercise = exercises.find((exercise) => exercise.id === parseInt(exerciseid));

  // Predefined options for sets, reps, and time, musclegroups
  const musclegroups = ['Arms', 'Shoulders', 'Chest', 'Abdominals', 'Butt/Legs', 'Cardio'];
  const SETS = ['0','1', '2', '3', '4', '5', '6','7', '8', '9', '10'];
  const REPS = ['0','1', '2', '3', '4', '5', '6','7', '8', '9', '10', '11', '12', '13', '14', '15', '16','17', '18', '19', '20', '21', '22', '23', '24', '25', '26','27', '28', '29', '30'];
  const TIME = ['0', '30 SECONDS','45 SECONDS','60 SECONDS','2 MINUTES','5 MINUTES', '10 MINUTES','15 MINUTES','20 MINUTES','25 MINUTES','30 MINUTES'];

  // Form data and error state
    const [exerciseData, setExerciseData] = useState({
    // id: currentUser,
    name: '',
    instructions: '',
    musclegroup: '',
    equipment: '',
    sets: '',
    reps: '',
    time: '',
  });

    const [errors, setErrors] = useState({});
    
    useEffect(() => {
      if (exercise) {
        setExerciseData({
                // id: currentUser,
                name: exercise.name || '',
                instructions: exercise.instructions || '',
                musclegroup: exercise.musclegroup || '',
                equipment: exercise.equipment || '',
                sets: exercise.sets || '',
                reps: exercise.reps || '',
                time: exercise.time || '',
            })
        }
    }, [currentUser, exercise ]);

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
      await dispatch(changeExercise(exerciseid, exerciseData));
        navigate(`/exercise/${exerciseid}`); // Redirect to exercise list page or another page
    } catch (error) {
    //   console.error('Error updating exercise', error);
      setErrors(error.errors || { general: 'Something went wrong' }); // Handle backend validation errors
    }
  };
    
    if (!exercise) {
        return <p>Loading exercise....</p>;
    }

  return (
    <div className="update-exercise-form">
      <h2>Update Exercise</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <button type="submit">Update Exercise</button>
      </form>
    </div>
  );
};

export default UpdateExerciseForm;


// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { changeExercise } from '../../redux/exercise';
// import { useNavigate, useParams } from 'react-router-dom';
// import './UpdateExercise.css';

// const UpdateExerciseForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { exerciseid } = useParams();  // Correct usage without default value
//   const currentUser = useSelector((state) => state.session.user.id);

//   const exercise = useSelector((state) =>
//     (state.exercises || []).find((exercise) => exercise.id === parseInt(exerciseid)) || null
//   );

//   console.log('Exercise:', exercise);  // Debugging the exercise

//   const musclegroups = ['Arms', 'Shoulders', 'Chest', 'Abdominals', 'Butt/Legs', 'Cardio'];
//   const SETS = ['1', '2', '3', '4', '5'];
//   const REPS = ['5', '10', '15', '20'];
//   const TIME = ['30 SECONDS', '1 MINUTE', '2 MINUTES'];

//   const [exerciseData, setExerciseData] = useState({
//     name: '',
//     instructions: '',
//     musclegroup: '',
//     equipment: '',
//     sets: '',
//     reps: '',
//     time: '',
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (exercise) {
//       setExerciseData({
//         name: exercise.name || '',
//         instructions: exercise.instructions || '',
//         musclegroup: exercise.musclegroup || '',
//         equipment: exercise.equipment || '',
//         sets: exercise.sets || '',
//         reps: exercise.reps || '',
//         time: exercise.time || '',
//       });
//     }
//   }, [exercise]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setExerciseData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});

//     try {
//       if (!exerciseid || !exerciseData) {
//         throw new Error('Exercise ID or data is missing');
//       }

//       await dispatch(changeExercise(exerciseid, exerciseData));
//       navigate(`/exercise/${exerciseid}`);
//     } catch (error) {
//       console.error('Error updating exercise', error);
//       setErrors(error.errors || { general: 'Something went wrong' });
//     }
//   };

//   if (!exercise) {
//     return <p>Loading exercise....</p>;
//   }

//   return (
//     <div className="update-exercise-form">
//       <h2>Update Exercise</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={exerciseData.name}
//             onChange={handleChange}
//             required
//           />
//           {errors.name && <p className="error">{errors.name}</p>}
//         </div>

//         <div>
//           <label>Instructions</label>
//           <textarea
//             name="instructions"
//             value={exerciseData.instructions}
//             onChange={handleChange}
//             required
//           />
//           {errors.instructions && <p className="error">{errors.instructions}</p>}
//         </div>

//         <div>
//           <label>Muscle Group</label>
//           <select
//             name="musclegroup"
//             value={exerciseData.musclegroup}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select a muscle group</option>
//             {musclegroups.map((group) => (
//               <option key={group} value={group}>
//                 {group}
//               </option>
//             ))}
//           </select>
//           {errors.musclegroup && <p className="error">{errors.musclegroup}</p>}
//         </div>

//         <div>
//           <label>Equipment</label>
//           <input
//             type="text"
//             name="equipment"
//             value={exerciseData.equipment}
//             onChange={handleChange}
//             required
//           />
//           {errors.equipment && <p className="error">{errors.equipment}</p>}
//         </div>

//         <div>
//           <label>Sets</label>
//           <select
//             name="sets"
//             value={exerciseData.sets}
//             onChange={handleChange}
//             required
//           >
//             {SETS.map((set) => (
//               <option key={set} value={set}>
//                 {set}
//               </option>
//             ))}
//           </select>
//           {errors.sets && <p className="error">{errors.sets}</p>}
//         </div>

//         <div>
//           <label>Reps</label>
//           <select
//             name="reps"
//             value={exerciseData.reps}
//             onChange={handleChange}
//             required
//           >
//             {REPS.map((rep) => (
//               <option key={rep} value={rep}>
//                 {rep}
//               </option>
//             ))}
//           </select>
//           {errors.reps && <p className="error">{errors.reps}</p>}
//         </div>

//         <div>
//           <label>Time</label>
//           <select
//             name="time"
//             value={exerciseData.time}
//             onChange={handleChange}
//             required
//           >
//             {TIME.map((time) => (
//               <option key={time} value={time}>
//                 {time}
//               </option>
//             ))}
//           </select>
//           {errors.time && <p className="error">{errors.time}</p>}
//         </div>

//         {errors.general && <p className="error">{errors.general}</p>}
//         <button type="submit">Update Exercise</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateExerciseForm;
