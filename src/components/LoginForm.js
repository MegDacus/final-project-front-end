import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Button, Form } from "react-bootstrap";

function LoginForm() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [errors, setErrors] = useState();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

    function handleSubmit(e) {
        e.preventDefault()
        console.log({
            'email': email,
            'password': password  
        })
    }

  return (
    <div className="loginDiv m-5">
      <h2 className="loginText"> Log In</h2>
      <p className="detailsText"> Welcome Back. </p>
      <p className="detailsText"> Please Enter Your Details.</p>

        <Form onSubmit={handleSubmit}>
            <Form.Group className="formFields">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleEmailChange} type='email' placeholder="name@example.com"/>
            </Form.Group>
            <Form.Group className="formFields">
                <Form.Label>Password</Form.Label>
                <Form.Control  onChange={handlePasswordChange} type="password"/>
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
    </div>
    )
}

export default LoginForm;
