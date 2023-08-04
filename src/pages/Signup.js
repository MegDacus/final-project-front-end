import { React, useState, useEffect } from "react";
import login_vector from "../images/login_vector.jpg";
import { Container, Form, Button, Image, Row, Col } from "react-bootstrap";
import "../styles/Login.css";
import SignUpForm from "../components/Login/SignUpForm";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Signup({setUser}) {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState();

  function signUpPost(e) {
    e.preventDefault();
    fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((r) => {
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
          })
        navigate("/dashboard");
      });
    } else {
      r.json().then((errorsObject) => {
        const errorsArray = Object.values(errorsObject);
        const nestedErrorsArray = errorsArray[0];
        setErrors(nestedErrorsArray);
      });
    }
  })};

  return (
    <Container className="mt-5 text-center container-height">
      <h2 className="loginText"> Create Account</h2>
      <p className="detailsText"> Welcome! </p>
      <p className="detailsText"> Please Enter Your Details.</p>
      <Row>
        <Col md={1}></Col>
        <Col md={5}>
          <div className="max-width-container m-3">
            <Image
              className="login_img"
              src={login_vector}
              alt="people reading books"
            />
          </div>
        </Col>
          <SignUpForm
            setFormData={setFormData}
            errors={errors}
            formData={formData}
            signUpPost={signUpPost}
          />
        <Col md={1}></Col>
      </Row>
      <p style={{ color: "grey" }}>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces.
      </p>
      <Button onClick={signUpPost} className="mt-2" style={{ height: 50, width: 150 }} type="submit">
        Sign Up
      </Button>
      <Container className="mt-5">
        <Row>
          <Col md={3} />
          <Col md={3}>
            <p className="" id="accountQuestion">
              Already have an account?
            </p>
          </Col>
          <Col md={3}>
            <a id="signUpLink" href="/login">
              Log In
            </a>
          </Col>
          <Col md={3} />
        </Row>
      </Container>
    </Container>
  );
}

export default Signup;
