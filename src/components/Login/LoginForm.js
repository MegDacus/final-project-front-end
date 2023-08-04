import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Button, Form } from "react-bootstrap";
import UserContext from '../UserContext';

function LoginForm({setUser}) {
  const [formData, setFormData] = useState({
    "username": "", 
    "password": ""
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const loginDetails = {
      ...formData,
    };

    await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setUser({
              "id": data.id, 
              "username": data.username,
              "first_name": data.first_name,
              "last_name": data.last_name,
              "memberships": data.memberships,
              "is_admin": data.is_admin,
              "bookclubs": data.bookclubs,
              "profile_pic": data.profile_pic
            })})
            navigate("/dashboard") 
        } else {
            r.json().then((e) => setErrors(Object.values(e).toString()))
         }})
      
  }

  return (
        <div className="loginDiv m-5">
        <h2 className="loginText"> Log In</h2>
        <p className="detailsText"> Welcome Back. </p>
        <p className="detailsText"> Please Enter Your Details.</p>

        <Form onSubmit={handleSubmit}>
        <Form.Group className="formFields">
            <Form.Label>Username</Form.Label>
            <Form.Control
            onChange={handleChange}
            type="name"
            name="username"
            value={formData.username}
            />
        </Form.Group>
        <Form.Group className="formFields">
            <Form.Label>Password</Form.Label>
            <Form.Control
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
            />
        </Form.Group>
        <br />
        <Button id="formButton" type="submit">
            Login
        </Button>
        </Form>
        <Container className="d-flex mt-5 col-12">
        <div className="col-9"><p id="accountQuestion">
            Don't have an account?
        </p></div>
        <div className="col-3"><a id="signUpLink" href="/signup">
            Sign Up
        </a>
        </div>
        </Container>
        { errors ? <Alert variant="danger">{errors}</Alert> : null }
    </div>
    );
}

export default LoginForm;
