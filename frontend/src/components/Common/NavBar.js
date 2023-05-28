import React from 'react';
import {Button, Nav, Navbar } from 'react-bootstrap';

const NavBar = ({ authenticated, username, onLogout }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Quiz Platform</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav> 
          {!authenticated ? (
            <>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/myquiz">My Quiz</Nav.Link>
              <Nav.Link href="/profile">{username}</Nav.Link>
              <Button variant="outline-primary" onClick={onLogout}>Logout</Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
