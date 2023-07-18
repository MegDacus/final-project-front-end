import React from 'react';
import login_vector from '../images/login_vector.jpg'
import '../App.css'
import { Row, Col, Container, Image } from 'react-bootstrap';
import logo from '../images/black-logo.png'
import '../styles/Login.css'
import LoginForm from '../components/LoginForm';

function Login() {



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
                </Col>
            </Row>
        </Container>
    </Container>
)

}

export default Login;