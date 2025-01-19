import { useState, useEffect } from 'react'; 
import { NavLink } from 'react-router-dom';
// import './allExercises.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
 
  return (
    <div className='list'>
      <h1>Event List</h1>
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