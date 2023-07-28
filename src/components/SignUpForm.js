import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Button, Form } from "react-bootstrap";
import UserContext from '../components/UserContext';

function LoginForm() {
  const [formData, setFormData] = useState({
    "username": "",
    "first_name": "",
    "last_name": "",
    "password": "",
    "password_confirmation": "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const { setUser } = useContext(UserContext);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const signUpDetails = {
      ...formData,
    };

    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpDetails),
    })
      .then((r) => {
        if (r.ok) {
            r.json().then((data) => {
            setUser({
                "id": data.id, 
                "username": data.username,
                "first_name": data.first_name,
                "last_name": data.last_name,
                "memberships": data.memberships
            })
            navigate("/") })
        } else {
            r.json().then((e) => setErrors(Object.values(e).toString()))
         }})
      
  }

  return (
        <div className="loginDiv m-5">
        <h2 className="loginText"> Create Account</h2>
        <p className="detailsText"> Welcome! </p>
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
            <Form.Label>First Name</Form.Label>
            <Form.Control
            onChange={handleChange}
            type="name"
            name="first_name"
            value={formData.first_name}
            />
        </Form.Group>
        <Form.Group className="formFields">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
            onChange={handleChange}
            type="name"
            name="last_name"
            value={formData.last_name}
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
        <Form.Group className="formFields">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
            onChange={handleChange}
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            />
        </Form.Group>
        <Button className="mt-2" id="formButton" type="submit">
            Sign Up
        </Button>
        </Form>
        <Container className="d-flex mt-5 col-12">
        <div className="col-9"><p id="accountQuestion">
            Already have an account?
        </p></div>
        <div className="col-3"><a id="signUpLink" href="/login">
            Log In
        </a>
        </div>
        </Container>
        { errors ? <Alert variant="danger">{errors}</Alert> : null }
    </div>
    );
}

export default LoginForm;