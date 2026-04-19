import React, { useState } from "react";

function BookingForm({ event, availableTickets, onBook }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    id: "",
    department: "",
    tickets: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      err.email = "Valid email required";
    if (!form.id) err.id = "ID required";
    if (!form.department) err.department = "Department required";

    if (!form.tickets || form.tickets <= 0)
      err.tickets = "Enter valid ticket number";
    else if (form.tickets > availableTickets)
      err.tickets = "Not enough tickets available";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();

    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    onBook({
      ...form,
      tickets: Number(form.tickets),
      total: Number(form.tickets) * event.price
    });

    setForm({
      name: "",
      email: "",
      id: "",
      department: "",
      tickets: ""
    });

    setErrors({});
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Book Your Spot</h2>

      <div className="input-group">
        <label>Full Name</label>
        <input
          placeholder="e.g. John Doe"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <p className="error-text">{errors.name}</p>
      </div>

      <div className="input-group">
        <label>Email Address</label>
        <input
          placeholder="e.g. john@university.edu"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <p className="error-text">{errors.email}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="input-group">
          <label>Student ID</label>
          <input
            placeholder="ID Number"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />
          <p className="error-text">{errors.id}</p>
        </div>

        <div className="input-group">
          <label>Department</label>
          <input
            placeholder="e.g. CS / AI"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
          <p className="error-text">{errors.department}</p>
        </div>
      </div>

      <div className="input-group">
        <label>Number of Tickets</label>
        <input
          type="number"
          placeholder="Quantity"
          value={form.tickets}
          onChange={(e) => setForm({ ...form, tickets: e.target.value })}
        />
        <p className="error-text">{errors.tickets}</p>
      </div>

      <button type="submit">Complete Booking</button>
    </form>
  );
}

export default BookingForm;
