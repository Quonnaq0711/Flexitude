import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import './UpdateExercise.css';

const UpdateExerciseForm = () => {
  const navigate = useNavigate();
  const { exerciseid } = useParams(); 
  const [exerciseData, setExerciseData] = useState({
    name: '',
    instructions: '',
    musclegroup: '',
    equipment: '',
    sets: '',
    reps: '',
    time: '',
  });
  const [errors, setErrors] = useState({});
  
  const musclegroups = ['Arms', 'Shoulders', 'Chest', 'Abdominals', 'Butt/Legs', 'Cardio']; 
  const SETS = ['0','1', '2', '3', '4', '5', '6','7', '8', '9', '10'];
  const REPS = ['0','1', '2', '3', '4', '5', '6','7', '8', '9', '10', '11', '12', '13', '14', '15', '16','17', '18', '19', '20', '21', '22', '23', '24', '25', '26','27', '28', '29', '30'];
  const TIME = ['0', '30 SECONDS','45 SECONDS','60 SECONDS','2 MINUTES','5 MINUTES', '10 MINUTES','15 MINUTES','20 MINUTES','25 MINUTES','30 MINUTES'];

  
  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await fetch(`/api/exercise/${exerciseid}`);
        const data = await response.json();
        
        if (response.ok) {
          setExerciseData({
            name: data.name,
            instructions: data.instructions,
            musclegroup: data.musclegroup,
            equipment: data.equipment,
            sets: data.sets,
            reps: data.reps,
            time: data.time,
          });
        } else {
          throw new Error('Failed to fetch exercise data');
        }
      } catch (error) {
        console.error('Error fetching exercise data', error);
        setErrors({ general: 'Error loading exercise data' });
      }
    };

    fetchExerciseData();
  }, [exerciseid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before submitting

    try {
      const response = await fetch(`/api/exercise/update/${exerciseid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exerciseData),
      });

      if (response.ok) {
        navigate('/exercise/'); 
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || { general: 'Something went wrong' }); 
      }
    } catch (error) {
      console.error('Error updating exercise', error);
      setErrors({ general: 'Something went wrong' });
    }
  };

  return (
    <div className="update-exercise-form">
     
      <form onSubmit={handleSubmit}>
        <h2>Update Exercise</h2>
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
        <button className="b3" type="submit">Update Exercise</button>
      </form>
    </div>
  );
};

export default UpdateExerciseForm;


