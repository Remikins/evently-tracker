import React from "react";
import { Link } from "react-router-dom";

function Navigation({ isAdmin,  handleLogout}) {
    return (
        <nav className="navigation">
            <h2>Eventful</h2>
            {isAdmin ? (
                <>
                <Link to="/admin">Manage Events</Link>
                <Link to="/dashboard">Dashboard</Link>
                </>
            ) : (
                <>
                <Link to="/events">Events</Link>
                <Link to="/rsvp">My RSVP'd Events</Link> 
                </>
            )}
            <button onClick={handleLogout}>Log Out</button>

        </nav>
    )
}
export default Navigation;