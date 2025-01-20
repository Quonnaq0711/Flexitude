import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const UpdateEventForm = () => {
  const { eventid } = useParams(); 
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: '',
    startdate: '',
    enddate: '',
    description: '',
    workout: ''
  });
  const [workouts, setWorkouts] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = useSelector((state) => state.session.user.id);
    

  useEffect(() => {
      // Fetch event details
      const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/event/update/${eventid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }

        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setErrors({ fetch: error.message });
      }
    };
    
    
    const fetchWorkouts = async () => {
        try {
            const response = await fetch('/api/workout/', {
                method: 'GET',
          headers: {
              'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch workouts');
        }
        
        const data = await response.json();
        setWorkouts(data.workouts);
    } catch (error) {
        setErrors({ fetch: error.message });
    }
};

fetchEvent();
fetchWorkouts();
}, [eventid]);

function formatDate(date) {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month}-${day}-${year}`;
}
    
const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors({}); // Reset previous errors
    setMessage(''); // Reset previous message

    const updatedEvent = {
      title: event.title,
      startdate: formatDate(event.startdate),
      enddate: formatDate(event.enddate),
      description: event.description,
      workout: parseInt(event.workout),
      userid: currentUser, 
    };

    fetch(`/api/event/update/${eventid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Failed to update event');
      })
      .then((data) => {
        if (data.message === 'Event updated successfully') {
          setMessage('Event updated successfully!');
          navigate('/event/user'); 
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
    <div className="update-event-form">
      <form onSubmit={handleSubmit}>
        <h2>Update Event</h2>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Start Date</label>
          <input
            type="date"
            name="startdate"
            value={event.startdate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            name="enddate"
            value={event.enddate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Workout</label>
          <select
            name="workout"
            value={event.workout}
            onChange={handleChange}
            required
          >
            <option value="">Select a workout</option>
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
          Update Event
        </button>
      </form>
    </div>
  );
};


export default UpdateEventForm;
