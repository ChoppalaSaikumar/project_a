import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CandidateRegistrationForm = () => {
  const [candidateData, setCandidateData] = useState({
    name: '',
    age: '',
    party: '',
    photo: null,
    logo: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCandidateData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', candidateData.name);
    formData.append('age', candidateData.age);
    formData.append('party', candidateData.party);
    formData.append('photo', candidateData.photo);
    formData.append('logo', candidateData.logo);

    try {
      await axios.post('http://localhost:5000/api/register-candidate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Candidate registered successfully');
      setError('');
      // Clear form fields
      setCandidateData({
        name: '',
        age: '',
        party: '',
        photo: null,
        logo: null,
      });
      // Redirect to another page if needed
      navigate('/success');
    } catch (error) {
      console.error('Error:', error);
      setError('Error registering candidate');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Register Candidate</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={candidateData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={candidateData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="party" className="form-label">Political Party</label>
          <input
            type="text"
            className="form-control"
            id="party"
            name="party"
            value={candidateData.party}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">Photo</label>
          <input
            type="file"
            className="form-control"
            id="photo"
            name="photo"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="logo" className="form-label">Party Logo</label>
          <input
            type="file"
            className="form-control"
            id="logo"
            name="logo"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default CandidateRegistrationForm;
