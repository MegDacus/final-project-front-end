import {React, useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';

function BookForm({setShowForm}) {
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        "title": "",
        "author": "",
        "summary": "",
        "image_url": ""
    })

    function handleChange(e) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }


    const bookDetails = {
        ...formData,
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:3000/books", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(bookDetails),
        })
            .then((r) => {
            if (r.ok) {
                console.log(r)
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
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Book Title</Form.Label>
                <Form.Control onChange={handleChange} type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Author</Form.Label>
                <Form.Control onChange={handleChange} type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Summary</Form.Label>
                <Form.Control onChange={handleChange} as="textarea" rows={3}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Book Cover Image</Form.Label>
                <Form.Control type="text" placeholder="Enter Image URL"/>
            </Form.Group>
            <Button className="mt-3" type="submit">Add Book</Button>
            { success ? <Alert className="mt-3" variant="success">Book successfully added</Alert> : null}
            { errors ? <Alert className="mt-3" variant="danger">{errors}</Alert> : null }
        </Form>
    )
}

export default BookForm;