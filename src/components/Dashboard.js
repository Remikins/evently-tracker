import React from 'react';

function Dashboard({ rsvpCounts, checkInCounts, events }) {
  return (
    <div className="dashboard">
      <h2>RSVP & Check-In Dashboard</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.title} - RSVPs: {rsvpCounts[index] || 0}, Check-Ins: {checkInCounts[index] || 0}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
