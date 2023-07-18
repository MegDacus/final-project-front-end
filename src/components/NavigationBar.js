import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LogoIcon from '../images/logo-icon.png';

function NavigationBar() {

    return (
        <>
            <Navbar className="d-flex align-items-center navbar">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <Container>
                    <Navbar.Brand href="/"><img src={LogoIcon} alt="logo" width="40" height="40"/>
                    </Navbar.Brand>
                </Container>
                        <Nav.Link href="search">Search</Nav.Link>
                        <Nav.Link href="library">Library</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="login">Log In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavigationBar;