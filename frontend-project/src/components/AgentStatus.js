import React, { useState } from 'react';
import axios from 'axios';

const AgentStatus = () => {
  const [status, setStatus] = useState('offline');

  const handleStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/users/status', {
        status: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus(newStatus);
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  return (
    <div>
      <p>Current status: {status}</p>
      <button onClick={() => handleStatusChange('online')}>Go Online</button>
      <button onClick={() => handleStatusChange('offline')}>Go Offline</button>
    </div>
  );
};

export default AgentStatus;
