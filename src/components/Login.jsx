import React, { useState } from "react";

function Login({ onLogin, onSwitchToRegister }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple mock authentication
    if (credentials.username === "admin" && credentials.password === "admin123") {
      onLogin({ username: "admin", role: "admin" });
    } else if (credentials.username && credentials.password) {
      // Allow any login for demo
      onLogin({ username: credentials.username, role: "user" });
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px' }}>
      <h1>🎟 Smart Campus Event</h1>
      <form className="card" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", border: "none" }}>Welcome Back</h2>
        <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>Sign in to manage your bookings</p>
        
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
        </div>

        {error && <p className="error-text" style={{ marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

        <button type="submit">Sign In</button>
        
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem' }}>
          <p>Don't have an account? <span onClick={onSwitchToRegister} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>Create one</span></p>
          <p style={{ marginTop: '0.8rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            Hint: Use <b>admin / admin123</b> for admin portal
          </p>
        </div>
        
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

export default Login;
