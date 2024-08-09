import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { io } from 'socket.io-client';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [reassignInfo, setReassignInfo] = useState({});
  const [audio] = useState(new Audio('/notification.mp3')); // Inicializar el audio
  const [userInteracted, setUserInteracted] = useState(false); // Estado para verificar la interacción del usuario

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

    const socket = io('http://localhost:3000');
    socket.on('newTicket', (ticket) => {
      setTickets((prevTickets) => [...prevTickets, ticket]);
      if (userInteracted) {
        audio.play().catch((error) => console.log('Failed to play audio:', error));
      }
    });

    return () => {
      socket.off('newTicket');
    };
  }, [audio, userInteracted]);

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

  const handleUserInteraction = () => {
    setUserInteracted(true);
    audio.play().catch((error) => console.log('Failed to play audio:', error)); // Intentar reproducir el audio inmediatamente después de la interacción del usuario
  };

  return (
    <div>
      <Dialog open={!userInteracted} onClose={handleUserInteraction}>
        <DialogTitle>Welcome</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please click "Continue" to enable notifications for new tickets.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUserInteraction} color="primary">Continue</Button>
        </DialogActions>
      </Dialog>
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
