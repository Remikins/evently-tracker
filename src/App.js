import React, { useState } from 'react';
import './App.css';
import Admin from './components/Admin';
import User from './components/User';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [rsvpCounts, setRsvpCounts] = useState({});
  const [checkInCounts, setCheckInCounts] = useState({});


  const handleRsvp = (index) => {
    setRsvpCounts({
      ...rsvpCounts,
      [index]: (rsvpCounts[index] || 0) + 1,
    });
  };

 const handleCheckIn = (index) => {
    setCheckInCounts({
      ...checkInCounts,
      [index]: (checkInCounts[index] || 0) + 1,
    });
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const isAdmin = user.email === 'admin@example.com'; // Example admin email


  return (
    <Router>
    <div className="App">
      <Navigation isAdmin={user?.email === 'admin@example.com'} handleLogout={handleLogout} />
      <header className="App-header">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/events" /> : <Login onLogin={handleLogin} />} />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute 
                user={user} 
                isAdminRoute={true}
                component={Admin}
                events={events}
                setEvents={setEvents}
                rsvpCounts={rsvpCounts}
                setRsvpCounts={setRsvpCounts}
                checkInCounts={checkInCounts}
                handleRsvp={handleRsvp}
                handleCheckIn={handleCheckIn}
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute 
                user={user} 
                isAdminRoute={true}
                component={Dashboard}
                rsvpCounts={rsvpCounts}
                checkInCounts={checkInCounts}
                events={events}
              />
            } 
          />
          <Route 
            path="/events" 
            element={
              <PrivateRoute 
                user={user} 
                isAdminRoute={false}
                component={User}
                events={events}
                rsvpCounts={rsvpCounts}
                checkInCounts={checkInCounts}
                handleRsvp={handleRsvp}
                handleCheckIn={handleCheckIn}
              />
            } 
          />
          <Route 
            path="/rsvp" 
            element={
              <PrivateRoute 
                user={user} 
                isAdminRoute={false}
                component={User}
                events={events.filter((event, index) => rsvpCounts[index])}
                rsvpCounts={rsvpCounts}
                checkInCounts={checkInCounts}
                handleRsvp={handleRsvp}
                handleCheckIn={handleCheckIn}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/events" />} />
        </Routes>
      </header>
    </div>
  </Router>
);
}

export default App;
