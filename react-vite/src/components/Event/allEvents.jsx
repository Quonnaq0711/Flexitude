import { useState, useEffect } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import './AllEvents.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    fetch('/api/event/')
      .then(response => response.json())
      .then(data => {
        setEvents(data.events);
        setLoading(false);
      })
      .catch(
        error => {
        setError('Failed to fetch events');
        setLoading(false);
      })
  }, []);  

  if (loading) {
    return <p className="loading-message">Loading events...</p>;
  }

  if (error) {
    return <p className="loading-message">{error}</p>;
  }

  const AddEvent = () => {
    navigate('/event/new')
  }

  const random = () => {
    alert('Feature Coming Soon...')
}
 
  return (
    <div className='list'>
       <div className="EventLinks">
                <NavLink to={'/exercise/' } className='eventbutton'>
                  Exercises  
                </NavLink>
                <NavLink to={'/workout/'} className='eventbutton'>
                    Workouts
                </NavLink>
                <NavLink to={'/event/'} className='eventbutton'>
                    Events
                </NavLink>
                <NavLink onClick={random} className='eventbutton'>
                    Randomizer
                </NavLink>
            </div>
      <h1>Event List</h1>
      <button className='b2' onClick={AddEvent}>Add Event</button>
      <ul>
        {events.map(event => (
          <NavLink key={event.id} to={`${event.id}`} className='NavLink'>
            <li>{event.title}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default EventList;