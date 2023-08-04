import React from 'react';
import login_vector from '../images/login_vector.jpg'
import {Container, Col, Row, Image} from 'react-bootstrap';
import '../styles/Login.css'
import LoginForm from '../components/Login/LoginForm';
import Footer from '../components/Footer';

function Login({setUser}) {


return (
    <>
    <Container className="d-flex align-items-center justify-content-center m-5 container-height">
        <div className="max-width-container ml-">
            <Image className='login_img' src={login_vector} alt="people reading books"/>
        </div>
        <LoginForm setUser={setUser}/>
    </Container>
    </>
)

}

export default Login;
