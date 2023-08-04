import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import LogoIcon from '../images/logo-icon.png';
import UserContext from '../components/UserContext';
import { useNavigate, useLocation } from 'react-router-dom'

function NavbarMain({setUser}) {
   const user = useContext(UserContext);
   const navigate = useNavigate();
   const location = useLocation();
   useEffect(() => {
   }, [location])

   const getUser = async () => {
    await fetch('http://localhost:3000/me')
    .then((r) => {
        if (r.ok) {
        } else {
        }})}
   
   const handleLogout = () => { 
    fetch('http://localhost:3000/logout', {
        method: 'delete', 
        header: {
            'content-type': 'application/json'
        }
    })
    .then((r) => console.log(r))
    .then(() => {
        setUser(null)
        navigate("/")
    })
    };

  return (
    <>
        <Navbar className="d-flex align-items-center navbar">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
        { user ? 
        <>
            <Nav className="ml-auto">
                <Container>
                    <Navbar.Brand href="/"><img src={LogoIcon} alt="logo" width="40" height="40"/>
                    </Navbar.Brand>
                </Container>
                    <Nav.Link href="/search">Search</Nav.Link>
                    <Nav.Link href="/library">Library</Nav.Link>
                    <Nav.Link href="/clubs">Clubs</Nav.Link>
            </Nav>
            <Nav style={{"position": "absolute", "right": 10}}>
                <NavDropdown title={`Hello, ${user.first_name}`} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </>
        :
        <>
        <Nav className="ml-auto">
            <Container>
                <Navbar.Brand href="/">
                    <img src={LogoIcon} alt="logo" width="40" height="40"/>
                </Navbar.Brand>
            </Container>
        </Nav>
        <Nav style={{position: "absolute", right: 10}}>
            <Nav.Link href="login">Log In</Nav.Link>
        </Nav>
        </>
        }
        </Navbar.Collapse>
        </Navbar>
    </>
)};

export default NavbarMain;