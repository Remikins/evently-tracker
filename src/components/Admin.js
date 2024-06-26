
import React, { useState } from 'react';
import User from './User';


function Admin({ events, setEvents, rsvpCounts, setRsvpCounts, checkInCounts, handleRsvp, handleCheckIn }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const handleAddOrUpdateEvent = () => {
    if (title && date) {
      const newEvent = { title, date, description, imageUrl };

      if (editingIndex !== null) {
        const updatedEvents = events.map((event, index) =>
          index === editingIndex ? newEvent : event
        );
        setEvents(updatedEvents);
        setEditingIndex(null);
      } else {
        setEvents([...events, newEvent]);
        setRsvpCounts({ ...rsvpCounts, [events.length]: 0 });
      }

      setTitle('');
      setDate('');
      setDescription('');
      setImageUrl('');
    }
  };

  const handleEditEvent = (index) => {
    const event = events[index];
    setTitle(event.title);
    setDate(event.date);
    setDescription(event.description);
    setImageUrl(event.imageUrl);
    setEditingIndex(index);
  };

  const handleDeleteEvent = (index) => {
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
    const newRsvpCounts = { ...rsvpCounts };
    delete newRsvpCounts[index];
    setRsvpCounts(newRsvpCounts);
    if (index === editingIndex) {
      setEditingIndex(null);
      setTitle('');
      setDate('');
      setDescription('');
      setImageUrl('');
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  if (isPreview) {
    return (
      <div className="admin">
        <button onClick={togglePreview}>Back to Admin View</button>
        <User
          events={events}
          rsvpCounts={rsvpCounts}
          checkInCounts={checkInCounts}
          handleRsvp={handleRsvp}
          handleCheckIn={handleCheckIn}
        />
      </div>
    );
  }

  return (
    <div className="admin">
      <h2>Admin</h2>
      <div className="event-form">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button onClick={handleAddOrUpdateEvent}>
          {editingIndex !== null ? 'Update Event' : 'Add Event'}
        </button>
        <button onClick={togglePreview}>
          Preview User View
        </button>
      </div>
      <div className="event-list">
        {events.map((event, index) => (
          <div key={index} className="event-item">
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <button onClick={() => handleEditEvent(index)}>Edit</button>
            <button onClick={() => handleDeleteEvent(index)}>Delete</button>
          </div>
        ))}
      </div>
    
    </div>
  );
}

export default Admin;
