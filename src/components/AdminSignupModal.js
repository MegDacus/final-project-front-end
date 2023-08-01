import { React, useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";

function AdminSignupModal() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const resetAlerts = () => {
        setSuccess(false);
        setErrors('');
    };

    if (success || errors) {
        const timeout = setTimeout(resetAlerts, 10000);
        return () => clearTimeout(timeout);
    }
  }, [success, errors])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await fetch("http://localhost:3000/admin_signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((r) => {
        if (r.ok) {
            setSuccess(true);
            setFormData({
                "title": "",
                "author": "",
                "summary": "",
                "image_url": ""
            })
            
        } else {
            r.json().then((e) => setErrors(Object.values(e).toString()))
        }})
  };

  return (
    <Container>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={handleChange}
          type="text"
          name="username"
          value={formData.username}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          onChange={handleChange}
          type="text"
          name="first_name"
          value={formData.first_name}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          onChange={handleChange}
          type="text"
          name="last_name"
          value={formData.last_name}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Temporary Password</Form.Label>
        <Form.Control
          onChange={handleChange}
          type="password"
          name="password"
          value={formData.password}
        />
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
          onChange={handleChange}
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
        />
      </Form.Group>
      <Button className="mt-3" type="submit">
        Create User
      </Button>
    </Form>
     { success ? <Alert className="mt-3" variant="success">New admin user has been successfully created.</Alert> : null}
     { errors ? <Alert className="mt-3" variant="danger">{errors}</Alert> : null }
    </Container>
  );
}

export default AdminSignupModal;
