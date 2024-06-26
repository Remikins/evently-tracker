import React from 'react';


function User({ events, rsvpCounts, handleRsvp, handleCheckIn, checkInCounts }) {
  return (
    <div className="user">
      <h2>Events</h2>
      <div className="event-list">
        {events.map((event, index) => (
          <div key={index} className="event-item">
            <img src={event.imageUrl} alt={event.title} className="event-image" />
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <button onClick={() => handleRsvp(index)}>
              RSVP ({rsvpCounts[index] || 0})
            </button>
            <button onClick={() => handleCheckIn(index)}>
              Check-In ({checkInCounts[index] || 0})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
