// AdminNavBar.jsx
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminNavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/admin-dashboard">
        Admin Panel
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/create-user">
            Create User
          </Nav.Link>
            <Nav.Link as={Link} to="/ManageUsers">
              Manage Users
            </Nav.Link>
            <Nav.Link as={Link} to="/CreateVoterform">
              Create Voters List
            </Nav.Link>
            <Nav.Link as={Link} to="/CandidateList">
              Candidate List
            </Nav.Link>
            <Nav.Link as={Link} to="/results">
              View Results
            </Nav.Link>
            <Nav.Link />
            <Nav.Link as={Link} to="/logout">
              Logout
            </Nav.Link>
        
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavBar;
