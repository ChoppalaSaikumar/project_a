import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session data or authentication token
    localStorage.removeItem('authToken');  // If you are using token-based auth
    sessionStorage.removeItem('userSession'); // If using sessionStorage

    // Redirect to login page after logout
    navigate('/');  // Redirect to home or login page
  }, [navigate]);

  return (
    <div className="container">
      <h2>Logging Out...</h2>
      <p>You are being logged out. Redirecting to the login page.</p>
    </div>
  );
};

export default Logout;
