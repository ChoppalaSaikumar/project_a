import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './CandidateList.css';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Sending request to fetch candidates...');
    
    axios.get('http://localhost:5000/api/candidates')  // Ensure the URL is correct
      .then(response => {
        console.log('Response received:', response.data);
        setCandidates(response.data);
      })
      .catch(err => {
        console.error('Error fetching candidates:', err);
        setError('Error fetching candidates');
      });
  }, []);
  
  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  return (
    <Container>
      <h1 className="my-4">Candidate List</h1>
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
                    Age: {candidate.age}
                    <br />
                    Party: {candidate.party}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="alert alert-info" role="alert">No candidates available</div>
        )}
      </Row>
    </Container>
  );
};

export default CandidateList;
