import React, { useState } from "react";
import EventDetails from "./components/EventDetails";
import BookingForm from "./components/BookingForm";
import BookingSummary from "./components/BookingSummary";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import UserProfile from "./components/UserProfile";

function App() {
  const [view, setView] = useState("home"); // home, login, register, admin, profile
  const [user, setUser] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [allBookings, setAllBookings] = useState([]);

  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Symposium 2026",
      department: "Computer Science",
      date: "May 10, 2026",
      time: "10:00 AM",
      venue: "Auditorium Hall",
      price: 200,
      availableTickets: 50
    },
    {
      id: 2,
      name: "Design Hackathon",
      department: "Visual Arts",
      date: "May 15, 2026",
      time: "09:00 AM",
      venue: "Creative Lab",
      price: 150,
      availableTickets: 30
    },
    {
      id: 3,
      name: "Robo-Wars 2.0",
      department: "Mechanical Eng.",
      date: "May 20, 2026",
      time: "11:00 AM",
      venue: "Main Arena",
      price: 300,
      availableTickets: 100
    }
  ]);

  const selectedEvent = events.find(e => e.id === selectedEventId);

  const handleBooking = (data) => {
    // Update event availability
    setEvents(prev => prev.map(e => 
      e.id === selectedEventId ? { ...e, availableTickets: e.availableTickets - data.tickets } : e
    ));

    const newBooking = {
      ...data,
      eventId: selectedEventId,
      eventName: selectedEvent.name,
      id: Math.random().toString(36).substr(2, 9) // Unique booking ID
    };

    setBookingData(newBooking);
    setAllBookings(prev => [newBooking, ...prev]);
  };

  const handleCancel = (booking) => {
    if (confirm(`Are you sure you want to cancel your booking for ${booking.eventName}?`)) {
      // Remove from bookings
      setAllBookings(prev => prev.filter(b => b.id !== booking.id));
      
      // Return tickets to event
      setEvents(prev => prev.map(e => 
        e.id === booking.eventId ? { ...e, availableTickets: e.availableTickets + booking.tickets } : e
      ));

      alert("Booking cancelled successfully!");
    }
  };

  const resetTickets = () => {
    setEvents(events.map(e => ({ ...e, availableTickets: 50 }))); // Rough reset
    setAllBookings([]);
    setBookingData(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === "admin") {
      setView("admin");
    } else {
      setView("home");
    }
  };

  const handleRegister = (userData) => {
    setUser({ ...userData, role: "user" });
    setView("home");
  };

  const handleLogout = () => {
    setUser(null);
    setView("home");
    setSelectedEventId(null);
    setBookingData(null);
  };

  if (view === "login") {
    return <Login onLogin={handleLogin} onSwitchToRegister={() => setView("register")} />;
  }

  if (view === "register") {
    return <Register onRegister={handleRegister} onSwitchToLogin={() => setView("login")} />;
  }

  if (view === "admin") {
    return (
      <AdminDashboard 
        events={events}
        bookings={allBookings}
        onReset={resetTickets}
        onLogout={handleLogout}
      />
    );
  }

  if (view === "profile" && user) {
    return (
      <UserProfile 
        user={user} 
        bookings={allBookings} 
        onCancel={handleCancel}
        onBack={() => setView("home")}
      />
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>🎟 Smart Campus Event</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {user ? (
            <>
              <div 
                onClick={() => setView("profile")}
                style={{ 
                  cursor: 'pointer',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  background: 'var(--glass)', 
                  padding: '6px 12px', 
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)'
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>Hi, <b>{user.username}</b></span>
              </div>
              <button onClick={handleLogout} style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem', background: 'transparent' }}>Logout</button>
            </>
          ) : (
            <button onClick={() => setView("login")} style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}>Sign In</button>
          )}
        </div>
      </div>

      {!selectedEventId ? (
        <div className="events-grid">
          <h2 style={{ border: 'none', marginBottom: '1.5rem' }}>Upcoming Events</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {events.map(e => (
              <div key={e.id} className="card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, border: 'none' }}>{e.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: e.availableTickets > 0 ? 'var(--success)' : 'var(--error)' }}>
                    {e.availableTickets > 0 ? `${e.availableTickets} Slots` : 'Sold Out'}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem' }}>{e.department} • {e.date}</p>
                <p style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '0.5rem' }}>₹{e.price}</p>
                <button 
                  onClick={() => setSelectedEventId(e.id)}
                  disabled={e.availableTickets === 0}
                  style={{ marginTop: '1rem', background: e.availableTickets === 0 ? 'rgba(255,255,255,0.1)' : 'var(--primary)' }}
                >
                  {e.availableTickets === 0 ? 'Full' : 'Book Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <button 
            onClick={() => { setSelectedEventId(null); setBookingData(null); }}
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem', marginBottom: '1.5rem', background: 'var(--glass)' }}
          >
            ← All Events
          </button>
          
          <EventDetails event={selectedEvent} availableTickets={selectedEvent.availableTickets} />

          {selectedEvent.availableTickets > 0 ? (
            <BookingForm
              event={selectedEvent}
              availableTickets={selectedEvent.availableTickets}
              onBook={handleBooking}
            />
          ) : (
            <div className="card" style={{ textAlign: 'center', borderColor: 'var(--error)' }}>
              <h2 style={{ color: 'var(--error)', border: 'none' }}>Sold Out</h2>
              <p>Sorry, all tickets for this event have been claimed.</p>
            </div>
          )}

          {bookingData && bookingData.eventId === selectedEventId && (
            <BookingSummary event={selectedEvent} data={bookingData} />
          )}
        </>
      )}

      <footer style={{ textAlign: 'center', marginTop: '3rem', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem', borderTop: '1px solid var(--glass-border)' }}>
        © 2026 Smart Campus Event • Built for Excellence
      </footer>
    </div>
  );
}

export default App;
