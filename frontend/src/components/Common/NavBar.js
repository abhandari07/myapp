import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = ({ authenticated, username, onLogout }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Quiz Platform</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          {!authenticated ? (
            <>

            </> 
          ) : (
            <>
              <Nav.Link href="/register">My Quizzes</Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {!authenticated ? (
            <>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
            </>
          ) : (
            <>
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
