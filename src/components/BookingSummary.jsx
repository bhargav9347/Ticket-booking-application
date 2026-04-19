import React from "react";

function BookingSummary({ event, data }) {
  return (
    <div className="card confirmation-card">
      <div className="success-badge">✅ Booking Confirmed</div>
      <h2>Summary</h2>
      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '12px' }}>
        <p><b>Guest:</b> {data.name}</p>
        <p><b>Event:</b> {event.name}</p>
        <p><b>Tickets:</b> {data.tickets}</p>
        <div style={{ marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Total Amount Paid</span>
          <span style={{ color: '#22c55e', fontSize: '1.4rem', fontWeight: 700 }}>₹{data.total}</span>
        </div>
      </div>
    </div>
  );
}

export default BookingSummary;
