import React, { useState,} from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';


const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      const newUser = await res.json();
      navigate('/');
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <Container fluid className="mt-0 vh-100 d-flex align-items-center justify-content-center auth-bg">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
        <h2 className=" text-white font-weight-bold  mt-5 text-center">SIGN UP</h2>
          <Card className="p-4 shadow-lg">
            
            <Form onSubmit={handleSignup}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">Create Account</Button>
              <div className="mt-3 text-center">
                Already registered? <Link to="/login">Login</Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
