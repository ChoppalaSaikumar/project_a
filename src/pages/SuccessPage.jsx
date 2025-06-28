import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Registration Successful</h2>
      <div className="alert alert-success">
        The candidate has been registered successfully.
      </div>
      <p>
        <Link to="/CreateVoterform" className="btn btn-primary">Go to Home</Link>
      </p>
    </div>
  );
};

export default SuccessPage;
