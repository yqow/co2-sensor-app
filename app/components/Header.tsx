import React, { useState } from 'react'
import { Navbar, Button, Container, Nav, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import { useCookies } from 'react-cookie'

const Header = () => {

    const [cookie, setCookie, removeCookie] = useCookies(["userInfo"])

    const [isSignedIn, setIsSignedIn] = useState(false)

    return (
        <Navbar expand="lg">
            <Container className="ms-0">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                        <NavDropdown title="User" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/signin">Sign In</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/signup">
                                Sign Up
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header