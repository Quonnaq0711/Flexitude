import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserEvents.css';

const UserEventsList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch events from the backend
  useEffect(() => {
    fetch('/api/event/user')
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Failed to fetch events');
      })
      .then((data) => {
        if (data.events) {
          setEvents(data.events);
        } else {
          setError(data.message || 'No events found.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Error fetching events.');
        setLoading(false);
      });
  }, []);

  // Handle navigate to update page
  const handleUpdateClick = (eventId) => {
    navigate(`/event/update/${eventId}`);
  };

  // Handle delete request
  const handleDeleteClick = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      fetch(`/api/event/delete/${eventId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Event deleted successfully') {
            alert('Event deleted successfully!');
            setEvents(events.filter((event) => event.id !== eventId));
          } else {
            alert('Error deleting event');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('There was an error deleting the event');
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='div'>
      <h2>Your Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p className='p' >Description: {event.description}</p>
            <p className='p' >Start Date: {event.startdate}</p>
            <p className='p' >End Date: {event.enddate}</p>
            <div className='userbutton' >
            <button onClick={() => handleUpdateClick(event.id)}>Update</button>
            <button onClick={() => handleDeleteClick(event.id)}>Delete</button>
            </div>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default UserEventsList;