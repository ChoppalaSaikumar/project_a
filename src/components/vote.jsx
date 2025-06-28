import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [error, setError] = useState(null);
  const [userVoted, setUserVoted] = useState(false);
  const [userId, setUserId] = useState(null); // Store the userId once fetched
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of candidates
    axios.get('http://localhost:5000/api/candidates')
      .then(response => {
        setCandidates(response.data);
      })
      .catch(err => {
        console.error('Error fetching candidates:', err);
        setError('Error fetching candidates. Please try again later.');
      });

    // Fetch user profile from session/localStorage
    const fetchUserProfile = async () => {
      const username = localStorage.getItem('username');
      if (!username) {
        setError('No user logged in');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/profile?username=${username}`);
        setUserId(response.data.id); // Get the user ID from profile data
        if (response.data.hasVoted) {
          setUserVoted(true);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error fetching user profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleVote = () => {
    if (!selectedCandidate) {
      setError('Please select a candidate to vote for.');
      return;
    }

    // Ensure we have the userId before submitting the vote
    if (!userId) {
      setError('Error retrieving user ID. Please refresh the page.');
      return;
    }

    axios.post('http://localhost:5000/api/vote', { candidateId: selectedCandidate }, { withCredentials: true })
      .then(response => {
        navigate('/success');
      })
      .catch(err => {
        console.error('Error submitting vote:', err.response ? err.response.data : err.message);
        setError('Error submitting vote. Please try again later.');
      });
  };

  if (userVoted) {
    return <div className="alert alert-info" role="alert">You have already voted.</div>;
  }

  return (
    <Container>
      <h1 className="my-4">Vote for a Candidate</h1>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <Row>
        {candidates.length > 0 ? (
          candidates.map(candidate => (
            <Col key={candidate.id} md={4} className="mb-4">
              <Card className="candidate-card">
                <Card.Img
                  variant="top"
                  src={`data:image/jpeg;base64,${candidate.photo}`}
                  alt={candidate.name}
                />
                <Card.Body>
                  <Card.Title>{candidate.name}</Card.Title>
                  <Card.Text>
                    Party: {candidate.party}
                  </Card.Text>
                  <Button 
                    variant="primary"
                    onClick={() => setSelectedCandidate(candidate.id)}
                    className={selectedCandidate === candidate.id ? 'active' : ''}
                  >
                    Select
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="alert alert-info" role="alert">No candidates available</div>
        )}
      </Row>
      <Button 
        variant="success" 
        onClick={handleVote}
        disabled={!selectedCandidate}
      >
        Vote
      </Button>
    </Container>
  );
};

export default Vote;
