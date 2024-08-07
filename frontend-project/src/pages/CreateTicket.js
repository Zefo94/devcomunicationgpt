import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/tickets', {
        title,
        description,
        status,
        assignedTo,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Reset form
      setTitle('');
      setDescription('');
      setStatus('');
      setAssignedTo('');
    } catch (error) {
      setError('Failed to create ticket. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <TextField
        label="Assigned To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <Button type="submit">Create Ticket</Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateTicket;
