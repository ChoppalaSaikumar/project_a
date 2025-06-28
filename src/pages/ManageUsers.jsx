import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        // Format the DOB field
        const formattedUsers = response.data.map(user => ({
          ...user,
          dob: user.dob.split('T')[0] // Format to YYYY-MM-DD
        }));
        setUsers(formattedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  return (
    <div className="container">
      <h2>Manage Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Place</th>
            <th>Aadhaar Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.dob}</td>
              <td>{user.place}</td>
              <td>{user.aadhar_no}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(user.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
