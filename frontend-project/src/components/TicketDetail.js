// src/components/TicketDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      const response = await axios.get(`http://localhost:3000/api/tickets/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTicket(response.data);
    };
    fetchTicket();
  }, [id]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{ticket.title}</Typography>
        <Typography variant="body1">{ticket.description}</Typography>
        <Typography variant="body2">Status: {ticket.status}</Typography>
        <Typography variant="body2">Assigned To: {ticket.assignedTo}</Typography>
      </CardContent>
    </Card>
  );
};

export default TicketDetail;
