import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const username = localStorage.getItem('username');
      if (!username) {
        setError('No user logged in');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/profile?username=${username}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error:', error);
        setError('Error fetching user profile');
      }
    };

    fetchProfile();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = (ID) => {
    navigate(`/edit-user2/${ID}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">User Profile</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!error && profile && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title"><strong>ID:</strong> {profile.id}</h5>
            <h5 className="card-title"><strong>Username:</strong> {profile.username}</h5>
            <p className="card-text"><strong>Name:</strong> {profile.name}</p>
            <p className="card-text"><strong>Date of Birth:</strong> {profile.dob.slice(0, 10)}</p>
            <p className="card-text"><strong>Place:</strong> {profile.place}</p>
            <p className="card-text"><strong>Aadhaar Number:</strong> {profile.aadhar_no}</p>

            <div className="mt-4">
              <button className="btn btn-primary" onClick={() => handleEdit(profile.id)}>Edit</button>
              <button className="btn btn-secondary ms-2" onClick={handleBack}>Back</button>
            </div>
          </div>
        </div>
      )}

      {!error && !profile && (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
