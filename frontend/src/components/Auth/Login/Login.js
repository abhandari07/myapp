import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../../api'; // Import the API call
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response.status === 200) {
        setSuccessMessage("Login successful! Redirecting...");
        localStorage.setItem("token", response.data.token); // Store the token
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('email', response.data.email);
        setTimeout(() => {
          navigate("/"); // redirect to the landing page after login
        }, 3000); // wait for 3 seconds before redirecting
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login">
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br/>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        &nbsp;&nbsp;
        <Button variant="primary" className="mr-2" href="/register">
            Register
        </Button>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
      </Form>
    </div>
  );
};

export default Login;
