import React from 'react';
import { Button, Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import './Landing.css';

const Landing = () => {
  return (
      <Container className="d-flex align-items-center justify-content-center" style={{ height: "calc(100vh - 56px)" }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="text-center">
            <h1>Welcome to the Quiz Platform!</h1>
            <p>
              This is a simple, accessible, and fun platform to create and participate in quizzes.
            </p>
          </Col>
        </Row>
      </Container>
  );
};
export default Landing;