import React, { useState } from "react";

function Register({ onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Mock registration success
    onRegister({ username: formData.username, email: formData.email });
  };

  return (
    <div className="container" style={{ maxWidth: "400px" }}>
      <h1>🎟 Smart Campus Event</h1>
      <form className="card" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", border: "none" }}>Create Account</h2>
        <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>Join us for exclusive event access</p>
        
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="name@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Min. 8 characters"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>

        {error && <p className="error-text" style={{ marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

        <button type="submit">Create Account</button>
        
        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem' }}>
          Already have an account? <span onClick={onSwitchToLogin} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>Sign In</span>
        </p>
        
        <p 
          onClick={() => window.location.reload()} 
          style={{ textAlign: 'center', fontSize: '0.75rem', cursor: 'pointer', color: 'var(--text-muted)', marginTop: '0.5rem' }}
        >
          Back to Home
        </p>
      </form>
    </div>
  );
}

export default Register;
