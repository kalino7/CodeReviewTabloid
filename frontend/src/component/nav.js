import React from 'react';
import { NavLink } from 'react-router';
import {Container, Nav, Navbar} from 'react-bootstrap';

const MenuBar = () => {
    return (
        <Navbar bg="primary" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">CODEREVIEW</Navbar.Brand>
          <Nav>
            <Nav.Link as={NavLink} to="/">Home </Nav.Link>
            <Nav.Link as={NavLink} to="/dashboard"> Dashboard </Nav.Link>
            <Nav.Link as={NavLink} to="/register"> Register </Nav.Link>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
};

export default MenuBar;