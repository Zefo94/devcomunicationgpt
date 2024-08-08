import React from 'react';
import TicketList from '../components/TicketList';
import AutoResponse from '../components/AutoResponse';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <TicketList />
      <AutoResponse />
    </div>
  );
}

export default AdminDashboard;
