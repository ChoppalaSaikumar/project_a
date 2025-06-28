import React from 'react';
import { Container } from 'react-bootstrap';

const SuccessPage = () => {
  return (
    <Container>
      <h1 className="my-4">Vote Successful!</h1>
      <p>Your vote has been successfully submitted. Thank you for participating!</p>
    </Container>
  );
};

export default SuccessPage;
