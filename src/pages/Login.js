import React from 'react';
import login_vector from '../images/login_vector.jpg'
import '../App.css'
import { Form, Button } from 'react-bootstrap';
import logo from '../images/black-logo.png'
import '../styles/Login.css'

function Login() {
return (
    <div className="loginPage">
        <div>
            <a href="/">
            <img src={logo} className="logo" alt="logo"/>
            </a>
            <img className='login_img' src={login_vector} alt="people reading books"/>
        </div>

        <div className="loginDiv">
            <h2 className='loginText'> Log In</h2>
            <p className="detailsText"> Welcome Back. </p>
            <p className="detailsText"> Please Enter Your Details.</p>

            <Form>
                <Form.Group className="formFields">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' placeholder="name@example.com"/>
                </Form.Group>
                <Form.Group className="formFields">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"/>
                <Form.Text muted>
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces.
                </Form.Text>
                </Form.Group>
                <br/>
                <br/>
                <Button id="formButton" type="submit">Login</Button>
            </Form>
            <div>
                <p id="accountQuestion">Don't have an account?</p>
                <a id='signUpLink' href='#Home'>Sign Up</a>
            </div>
        </div>
    </div>
)

}

export default Login;