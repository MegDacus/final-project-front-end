import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import LogoIcon from '../images/logo-icon.png';

function NavbarMain() {
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch('http://localhost:3000/me')
        .then((r) => {
           if (r.ok) {
            r.json().then((data) => {
                setUser({
                    "username": data.username,
                    "first_name": data.first_name,
                    "last_name": data.last_name
                })
            })
            }
            else {
                setUser(null)
            }
        })}, [])

   const handleLogout = () => {

    fetch('http://localhost:3000/logout', {
        method: 'delete', 
        header: {
            'content-type': 'application/json'
        }
    })
    .then((r) => console.log(r))
    };

    const loggedInNav = () => {
        return(
            <NavDropdown title={`Hello, ${user.first_name}`} id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
        )
    }

    const loggedOutNav = () => {
        return(
            <Nav.Link href="login">Log In</Nav.Link>
        )
    }

  return (
    <>
        <Navbar className="d-flex align-items-center navbar">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Container>
                    <Navbar.Brand href="/"><img src={LogoIcon} alt="logo" width="40" height="40"/>
                    </Navbar.Brand>
                </Container>
                    <Nav.Link href="search">Search</Nav.Link>
                    <Nav.Link href="library">Library</Nav.Link>
                    <Nav.Link href="clubs">Clubs</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
                { !user ? loggedOutNav() : loggedInNav() }
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
)};

export default NavbarMain;