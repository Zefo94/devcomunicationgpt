import React from 'react';
import TicketList from '../components/TicketList';
import AgentStatus from '../components/AgentStatus';

function AgentDashboard() {
  return (
    <div>
      <h1>Agent Dashboard</h1>
      <AgentStatus />
      <TicketList />
    </div>
  );
}

export default AgentDashboard;
