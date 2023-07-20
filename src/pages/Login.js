import React from 'react';
import login_vector from '../images/login_vector.jpg'
import { Row, Col, Container, Image, Button } from 'react-bootstrap';
import logo from '../images/black-logo.png'
import '../styles/Login.css'
import LoginForm from '../components/LoginForm';

function Login() {

    function handleLogout() {
        fetch('http://localhost:3000/logout', {
            method: 'delete', 
            header: {
                'content-type': 'application/json'
            }
        })
        .then((r) => console.log(r))
    }

    function handleMeRequest() {
        fetch('http://localhost:3000/me')
        .then((r) => console.log(r))
    }


return (
    <Container className="loginPage">
        <Container className="m-5">
            <Row>
                <a href="/">
                <Image src={logo} className="logo" alt="logo"/>
                </a>
            </Row>
        </Container>
        <Container className="col-12">
            <Row>
                <Col>
                    <Container className="pl-1 col-6">
                        <Image className='login_img' src={login_vector} alt="people reading books"/>
                    </Container>
                </Col>
                <Col>
                    <LoginForm/>
                    <Button onClick={handleLogout}>Logout</Button>
                    <Button onClick={handleMeRequest}>ME</Button>
                </Col>
            </Row>
        </Container>
    </Container>
)

}

export default Login;