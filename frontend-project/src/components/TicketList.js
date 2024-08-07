import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Button, TextField } from '@mui/material';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [reassignInfo, setReassignInfo] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/tickets', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(response.data);
      } catch (error) {
        setError('Failed to load tickets. Please try again later.');
      }
    };
    fetchTickets();
  }, []);

  const handleReassign = async (ticketId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3000/api/tickets/reassign/${ticketId}`, {
        newAssignedTo: reassignInfo[ticketId],
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh tickets after reassignment
      const response = await axios.get('http://localhost:3000/api/tickets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTickets(response.data);
      setReassignInfo((prev) => ({ ...prev, [ticketId]: '' }));
    } catch (error) {
      setError('Failed to reassign ticket. Please try again later.');
    }
  };

  const handleReassignChange = (ticketId, value) => {
    setReassignInfo((prev) => ({ ...prev, [ticketId]: value }));
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <List>
          {tickets.map((ticket) => (
            <ListItem key={ticket.id}>
              <ListItemText primary={ticket.title} secondary={ticket.description} />
              <TextField
                label="Reassign to"
                value={reassignInfo[ticket.id] || ''}
                onChange={(e) => handleReassignChange(ticket.id, e.target.value)}
              />
              <Button onClick={() => handleReassign(ticket.id)}>Reassign</Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default TicketList;
