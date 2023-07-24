import React from 'react';
import login_vector from '../images/login_vector.jpg'
import { Row, Col, Container, Image, Button } from 'react-bootstrap';
import '../styles/Login.css'
import LoginForm from '../components/LoginForm';

function Login() {


return (
    <Container className="d-flex align-items-center justify-content-center m-5">
        <div className="max-width-container ml-">
            <Image className='login_img' src={login_vector} alt="people reading books"/>
        </div>
        <LoginForm/>
    </Container>
)

}

export default Login;