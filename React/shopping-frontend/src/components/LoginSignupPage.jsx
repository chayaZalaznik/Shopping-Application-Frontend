import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const LoginSignupPage = () => {
  return (
    <div className="login-signup-page">
      <h2>Login or Sign Up</h2>
      <div>
        <Button as={Link} to="/login" variant="primary">Login</Button>
        <Button as={Link} to="/signup" variant="secondary" className="ml-2">Sign Up</Button>
      </div>
    </div>
  );
};

export default LoginSignupPage;
