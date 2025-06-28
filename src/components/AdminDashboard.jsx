import React from 'react';

const AdminDashboard = () => {
  const backgroundStyle = {
    backgroundImage: 'url("public/finger.png")', // Background image path
    backgroundSize: 'cover',     // Make sure image covers the whole div
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: '#2e2e2e',  // Fallback color
    minHeight: '80vh',
    minWidth: '100%',
    height: '50vh',
    width: '100%',
    color: 'green',
    padding: '10rem',
    position: 'relative',
  };

  return (
    <div style={backgroundStyle} className="container mt-5 fade-in">
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin! Manage users and system settings here.</p>
    </div>
  );
};

export default AdminDashboard;
