import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ManageUsers from './pages/ManageUsers';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import AdminNavBar from './components/AdminNavBar'; 
import UserNavBar from './components/UserNavBar'; 
import CreateUser from './components/CreateUser';
import Logout from './components/Logout'; 
import VotingForms from './pages/CandidateRegistrationForm'; 
import EditUser from './components/EditUser';
import EditUser2 from './components/Edituser2';
import Profile from './components/UserProfile';
import SuccessPage from './pages/SuccessPage';
import CandidateList from './pages/CandidateList';
import Vote from './components/vote'; // Make sure this is used
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<><AdminNavBar /><AdminDashboard /></>} />
        <Route path="/user-dashboard" element={<><UserNavBar /><UserDashboard /></>} />
        <Route path="/create-user" element={<><AdminNavBar /><CreateUser /></>} />
        <Route path="/CreateVoterform" element={<><AdminNavBar /><VotingForms /></>} />
        <Route path="/ManageUsers" element={<><AdminNavBar /><ManageUsers /></>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/edit-user/:id" element={<><AdminNavBar /><EditUser /></>} />
        <Route path="/edit-user2/:id" element={<><UserNavBar /><EditUser2 /></>} />
        <Route path="/profile" element={<><UserNavBar /><Profile /></>} />
        <Route path="/success" element={<><AdminNavBar /><SuccessPage /></>} />
        <Route path="/Results" element={<><AdminNavBar /><Results /></>} />
        <Route path="/CandidateList" element={<><AdminNavBar /><CandidateList /></>} />
        <Route path="/vote" element={<><UserNavBar /><Vote /></>} />
      </Routes>
    </Router>
  );
}

export default App;
