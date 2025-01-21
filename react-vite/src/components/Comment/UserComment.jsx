import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserComment.css';

const UserCommentList = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch comments from the backend
  useEffect(() => {
    fetch('/api/comment/user')
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Failed to fetch comments');
      })
      .then((data) => {
        if (data.comments) {
          setComments(data.comments);
        } else {
          setError(data.message || 'No comments found.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Error fetching comments.');
        setLoading(false);
      });
  }, []);

  // Handle navigate to update page
  const handleUpdateClick = (commentId) => {
    navigate(`/comment/update/${commentId}`);
  };

  // Handle delete request
  const handleDeleteClick = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      fetch(`/api/comment/delete/${commentId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'comment deleted successfully') {
            alert('comment deleted successfully!');
            setComments(comments.filter((comment) => comment.id !== commentId));
          } else {
            alert('Error deleting comment');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('There was an error deleting the comment');
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
      <h2>Your Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <h3>{comment.title}</h3>
            <p className='p' >Comment: {comment.comment}</p>
            <div className='userbutton' >
            <button onClick={() => handleUpdateClick(comment.id)}>Update</button>
            <button onClick={() => handleDeleteClick(comment.id)}>Delete</button>
            </div>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCommentList;