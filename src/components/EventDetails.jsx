import React from "react";

function EventDetails({ event, availableTickets }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
        <h2 style={{ border: 'none', margin: 0 }}>Event Details</h2>
        <span style={{ 
          background: availableTickets > 10 ? 'rgba(99, 102, 241, 0.2)' : 'rgba(239, 68, 68, 0.2)', 
          color: availableTickets > 10 ? '#818cf8' : '#f87171',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 600
        }}>
          {availableTickets} Left
        </span>
      </div>
      
      <div className="details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <p><b>Name</b></p>
          <p>{event.name}</p>
        </div>
        <div>
          <p><b>Department</b></p>
          <p>{event.department}</p>
        </div>
        <div>
          <p><b>Date & Time</b></p>
          <p>{event.date} at {event.time}</p>
        </div>
        <div>
          <p><b>Venue</b></p>
          <p>{event.venue}</p>
        </div>
        <div>
          <p><b>Price</b></p>
          <p style={{ color: '#fbbf24', fontSize: '1.2rem', fontWeight: 700 }}>₹{event.price}</p>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
