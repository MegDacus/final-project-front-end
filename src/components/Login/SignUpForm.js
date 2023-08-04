import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {Modal, Alert, Container, Button, Form, Col } from "react-bootstrap";
import UserContext from '../UserContext';

function LoginForm({setFormData, errors, formData}) {
  const [show, setShow] = useState(false);
  
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (errors) {
      setShow(true)
    }
  }, [errors])

  return (
    <Col md={5}>
    <div md={5} style={{width: 430, height: 430}} className="d-flex align-items-center justify-content-center m-3">
        <Form className="p-3" >
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
        <Modal bg="danger" onHide={() => setShow(false)} show={show} animation={true} centered={true}>
          <Modal.Header className="bg-danger" closeButton>
            Uh-Oh!
          </Modal.Header>
          <Modal.Body className="">
          <ul>
          {errors && errors.map((error)=> (
            <li>{error}</li>
          ))}
          </ul>
          </Modal.Body>
          </Modal>
        </Form>
        </div>
        </Col>
    );
}

export default LoginForm;