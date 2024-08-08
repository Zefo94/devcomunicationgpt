// src/components/AutoResponse.js
import React, { useState } from 'react';
import axios from 'axios';

const AutoResponse = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3000/api/autoresponse', { message }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('');
    } catch (error) {
      console.error('Failed to set auto response:', error);
    }
  };

  return (
    <div>
      <h2>Set Auto Response</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          cols="50"
          placeholder="Enter your auto response message"
        />
        <br />
        <button type="submit">Set Auto Response</button>
      </form>
    </div>
  );
};

export default AutoResponse;
