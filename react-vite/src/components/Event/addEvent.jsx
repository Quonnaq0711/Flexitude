import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import './AddEventForm.css';

const AddEventForm = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const currentUser = useSelector((state) => state.session.user.id);
    const [form, setForm] = useState({
    title: '',
    startdate: '',
    enddate: '',
    description: '',
    workout: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workout/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              
          },
        });
          
        //    const text = await response.text(); // Get the raw response as text
        // console.log(text); // Log the raw response

        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }

        const data = await response.json();
        setWorkouts(data.workouts);
      } catch (error) {
        setErrors({ fetch: error.message });
      }
    };

    fetchWorkouts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function formatDate(date) {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month}-${day}-${year}`;
  }
  
    console.log("USER", currentUser);
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors({}); // Reset previous errors
    setMessage(''); // Reset previous message

      const newEvent = {
      title: form.title,
      startdate: formatDate(form.startdate),
      enddate: formatDate(form.enddate),
      description: form.description,
      workout: parseInt(form.workout),
      userid: currentUser, 
    };
      console.log("DATA", newEvent);
    fetch('/api/event/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Failed to create event');
      })
      .then((data) => {
        if (data.message === 'Event created successfully') {
          setMessage('Event created successfully!');
          navigate('/event/'); 
        } else {
          setErrors(data.errors || {});
        }
      })
      .catch((error) => {
        setErrors({ update: error.message });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

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
    <div className="add-event-form">
      <form onSubmit={handleSubmit}>
        <h2>Create New Event</h2>
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
          <label>Start Date</label>
          <input
            type="date"
            name="startdate"
            value={form.startdate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            name="enddate"
            value={form.enddate}
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
          <label>Workout</label>
          <select
            name="workout"
            value={form.workout}
            onChange={handleChange}
            required
          >
            {workouts.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.title}
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
        <button className='b3' type="submit" disabled={isSubmitting}>
          Create Event
        </button>
      </form>
      </div>
    </>
      );   
};

export default AddEventForm;

