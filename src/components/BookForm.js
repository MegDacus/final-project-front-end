import React from 'react';
import Form from 'react-bootstrap';

function BookForm() {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="name" value="title" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Author</Form.Label>
                <Form.Control type="name" value="author"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Book Cover Image</Form.Label>
                <Form.Control type="file"/>
            </Form.Group>
        </Form>
    )
}

export default BookForm;