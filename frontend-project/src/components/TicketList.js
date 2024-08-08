import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import { io } from 'socket.io-client';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [reassignInfo, setReassignInfo] = useState({});
  const [audio] = useState(new Audio('/notification.mp3')); // Ruta al archivo de sonido

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

    const socket = io('http://localhost:3000'); // Conexión al servidor de sockets
    socket.on('newTicket', (ticket) => {
      setTickets((prevTickets) => [...prevTickets, ticket]);
      audio.play(); // Reproducir sonido cuando llega un nuevo ticket
    });

    return () => {
      socket.off('newTicket');
    };
  }, [audio]);

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
      setReassignInfo({ ...reassignInfo, [ticketId]: '' });
    } catch (error) {
      setError('Failed to reassign ticket. Please try again later.');
    }
  };

  const handleInputChange = (ticketId, value) => {
    setReassignInfo({ ...reassignInfo, [ticketId]: value });
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
                onChange={(e) => handleInputChange(ticket.id, e.target.value)}
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
