import React, { useState } from 'react';
import { Button, Form, Alert} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { registerUser } from '../../../api'; 


const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
       await registerUser({
        email,
        username,
        password,
        role
      });

      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <div className="Register">
      <Form onSubmit={handleSubmit}>

      <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>


        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control as="select" onChange={e => setRole(e.target.value)}>
            <option>Choose...</option>
            <option value="QuizMaster">QuizMaster</option>
            <option value="Participant">Participant</option>
          </Form.Control>
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">
          Register
        </Button>

        {showSuccessAlert && (
          <Alert variant="success" className="mt-3">
            Registration successful! Redirecting to login...
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default Register;
