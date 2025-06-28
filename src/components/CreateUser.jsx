import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [place, setPlace] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [generatedUsername, setGeneratedUsername] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      dob,
      place,
      aadharNo
    };

    try {
      const response = await axios.post('http://localhost:5000/api/create-user', formData);
      setGeneratedUsername(response.data.username);
      setGeneratedPassword(response.data.password);
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('Error creating user: ' + (error.response ? error.response.data.message : error.message));
      setGeneratedUsername('');
      setGeneratedPassword('');
    }
  };

  return (
    <div className="container">
      <h2>Create a New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Place</label>
          <input
            type="text"
            className="form-control"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Aadhaar Number</label>
          <input
            type="text"
            className="form-control"
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create User</button>
      </form>
      {generatedUsername && (
        <div className="mt-3">
          <h3>User Created Successfully</h3>
          <p>Username: {generatedUsername}</p>
          <p>Password: {generatedPassword}</p>
        </div>
      )}
      {errorMessage && (
        <div className="mt-3 text-danger">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default CreateUser;
