import React, { useState, useEffect } from 'react';
import './Star.css'; // Import your CSS file

const StarButton = ({favorite, messageId,}) => {
  console.log('starbutton inside', favorite)
  const [isFavorite, setIsFavorite] = useState(favorite);
  
  useEffect(() => {
    console.log('Updated state:', isFavorite);
  }, [isFavorite]);

  const toggleFavorite = () => {
    console.log('beforeinputFavorite2', isFavorite)
    const updatedFavorite = !isFavorite
    setIsFavorite(updatedFavorite) 
    // setIsFavorite(!isFavorite);

    console.log('afterinputFavorite2', isFavorite)
    console.log('setIsFavorite ', !isFavorite)
    const data = {
      starred: updatedFavorite,
    };
    console.log('messageID', messageId)

    // Update the star status on the server using an API call
    fetch(`http://127.0.0.1:8000/chat/message/star/${messageId}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Updated star status:', data.starred);
        // You might want to handle further actions or feedback here
      })
      .catch(error => {
        console.error('Error updating star status:', error);
        // Handle error scenarios here
      });
  };

  return (
    <button 
      className={`star-button ${isFavorite ? 'favorited' : ''}`} 
      onClick={toggleFavorite}
      id= {messageId} >
    </button>
  );
};

export default StarButton;
