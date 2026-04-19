import React, { useState } from "react";
import EventDetails from "./components/EventDetails";
import BookingForm from "./components/BookingForm";
import BookingSummary from "./components/BookingSummary";

function App() {
  const [availableTickets, setAvailableTickets] = useState(50);
  const [bookingData, setBookingData] = useState(null);

  const event = {
    name: "Tech Symposium 2026",
    department: "Computer Science",
    date: "May 10, 2026",
    time: "10:00 AM",
    venue: "Auditorium Hall",
    price: 200
  };

  const handleBooking = (data) => {
    setAvailableTickets(prev => prev - data.tickets);
    setBookingData(data);
  };

  return (
    <div className="container">
      <h1>🎟 Smart Campus Events</h1>

      <EventDetails event={event} availableTickets={availableTickets} />

      {availableTickets > 0 ? (
        <BookingForm
          event={event}
          availableTickets={availableTickets}
          onBook={handleBooking}
        />
      ) : (
        <div className="card" style={{ textAlign: 'center', borderColor: 'var(--error)' }}>
          <h2 style={{ color: 'var(--error)', border: 'none' }}>Sold Out</h2>
          <p>Sorry, all tickets for this event have been claimed.</p>
        </div>
      )}

      {bookingData && (
        <BookingSummary
          event={event}
          data={bookingData}
        />
      )}
    </div>
  );
}

export default App;
