import React, { useState } from 'react';
import './Star.css'; // Import your CSS file

const StarButton = ({favorite, messageId}) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  
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

    // Update the star status on the server using an API call
    fetch(`http://127.0.0.1:8000/chat/message/${messageId}`, {
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
      onClick={toggleFavorite}>
    </button>
  );
};

export default StarButton;
