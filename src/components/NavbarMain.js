import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import LogoIcon from '../images/logo-icon.png';
import UserContext from '../components/UserContext';
import { useNavigate } from 'react-router-dom'

function NavbarMain() {
   const { user, setUser } = useContext(UserContext); 
   const navigate = useNavigate();
   
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

    const loggedInNav = () => {
            return(
            <NavDropdown title={`Hello, ${user.first_name}`} id="basic-nav-dropdown">
                <NavDropdown.Item as={Nav.Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                { user.is_admin ? <NavDropdown.Item href="/admin-home">Admin Dashboard</NavDropdown.Item> : null}
            </NavDropdown>
            )}

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
                    <Nav.Link href="/search">Search</Nav.Link>
                    <Nav.Link href="/library">Library</Nav.Link>
                    <Nav.Link href="/clubs">Clubs</Nav.Link>
            </Nav>
            <Nav style={{"position": "absolute", "right": 10}}>
                { !user ? loggedOutNav() : loggedInNav() }
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
)};

export default NavbarMain;