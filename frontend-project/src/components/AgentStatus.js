import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgentStatus = () => {
  const [status, setStatus] = useState('offline');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatus(response.data.status);
      } catch (error) {
        setError('Failed to fetch status. Please try again later.');
      }
    };
    fetchStatus();
  }, []);

  const updateStatus = async (newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/users/status', { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus(response.data.status);
    } catch (error) {
      setError('Failed to update status. Please try again later.');
    }
  };

  return (
    <div>
      <p>Current status: {status}</p>
      <button onClick={() => updateStatus('online')}>Go Online</button>
      <button onClick={() => updateStatus('offline')}>Go Offline</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AgentStatus;
