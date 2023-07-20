import {React, useState} from 'react';
import { Container, Button, Form } from 'react-bootstrap';

function LoginForm() {
    const [formData, setFormData] = useState({
        "username": "",
        "password": "",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault()

        const loginDetails = {
           ...formData,
        }

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify(loginDetails),
            credentials: 'include',
        })
        .then((r) => console.log(r))
        .then(() => {
            setFormData({
                username: "",
                password: "",
            });
            console.log('login complete')
        })
    }

    return (
        <Container className="loginDiv mr-1">
        <h2 className='loginText'> Log In</h2>
        <p className="detailsText"> Welcome Back. </p>
        <p className="detailsText"> Please Enter Your Details.</p>

        <Form onSubmit={handleSubmit}>
            <Form.Group className="formFields">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    onChange={handleChange} 
                    type='name'
                    name='username' 
                    value={formData.username}/>
            </Form.Group>
            <Form.Group className="formFields">
                <Form.Label>Password</Form.Label>
                <Form.Control  
                    onChange={handleChange} 
                    type="password"
                    name="password"
                    value={formData.password}/>
            <Form.Text muted>
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces.
            </Form.Text>
            </Form.Group>
            <br/>
            <Button id="formButton" type="submit">Login</Button>
        </Form>
        <Container className="d-flex mt-5 col-12">
            <p className="col-6" id="accountQuestion">Don't have an account?</p>
            <a className="col-6" id='signUpLink' href='#Home'>Sign Up</a>
        </Container>
    </Container>
    )
}

export default LoginForm;