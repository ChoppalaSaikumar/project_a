import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const EditUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    dob: '',
    place: '',
    aadhar_no: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        if (response.status === 200) {
          // Format the date to YYYY-MM-DD
          const userData = response.data;
          userData.dob = userData.dob.split('T')[0];
          setFormData(userData);
        } else {
          console.error('Error fetching user:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/users/${id}`, formData);
      if (response.status === 200) {
        setMessage('User updated successfully!');
        setTimeout(() => {
          navigate('/manageUsers');
        }, 2000); // Redirect after 2 seconds
      } else {
        console.error('Error updating user:', response.statusText);
        setMessage('Error updating user.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Error updating user.');
    }
  };

  const handleBack = () => {
    navigate('/manageUsers');
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Edit User</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="form-control"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="place">Place</label>
          <input
            type="text"
            id="place"
            name="place"
            className="form-control"
            value={formData.place}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="aadhar_no">Aadhaar Number</label>
          <input
            type="text"
            id="aadhar_no"
            name="aadhar_no"
            className="form-control"
            value={formData.aadhar_no}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
        <button type="button" className="btn btn-secondary" onClick={handleBack} style={{ marginLeft: '10px' }}>Back</button>
      </form>
    </div>
  );
};

export default EditUser;
