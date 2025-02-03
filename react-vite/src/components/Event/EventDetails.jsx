import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import './EventDetails.css';

function EventDetails() {
  const { eventid } = useParams(); // Extract the event ID from the URL parameters
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event details from the backend
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/event/${eventid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // const text = await response.text(); // Get the raw response as text
        // console.log(text); // Log the raw response

        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }

        const data = await response.json();
        setEvent(data.events);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const back1 = () => {
    navigate('/event/')
  }

  return (
    <>
      <button className='back' onClick={back1}>Back</button>
    <div className='wd1' >
      <h1>{event.title}</h1>               
      <p className='p1'>Start Date: {event.startdate}</p>
      <p className='p1'>End Date: {event.enddate}</p>
      <p className='p1'>Description: {event.description}</p>
      <Link className='p1' to={'/workout/'}>Workout: {event.workout}</Link>
      {/* <h3>Comments:</h3>
      <ul>
        {event.comments && event.comments.length > 0 ? (
          event.comments.map((comment) => (
            <li key={comment.eventid}>
              <h4>{comment.title}</h4>
              <p className='p1'><strong>Comment:</strong> {comment.comment}</p>
              <p className='p1'><strong>By:</strong> {comment.username}</p>
            </li>
          ))
        ) : (
          <p>No comments available for this event.</p>
        )}
      </ul> */}
      </div>
      </>
  );
}

export default EventDetails;