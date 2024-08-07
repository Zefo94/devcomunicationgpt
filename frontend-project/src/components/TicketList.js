// src/components/TicketList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@mui/material';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('/api/tickets', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Tickets received:', response.data);
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError('Failed to load tickets. Please try again later.');
      }
    };
    fetchTickets();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <List>
          {tickets.map((ticket) => (
            <ListItem key={ticket.id}>
              <ListItemText primary={ticket.title} secondary={ticket.description} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default TicketList;
