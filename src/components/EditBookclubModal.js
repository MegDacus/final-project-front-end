import {React, useState} from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';

function EditBookclubModal({show, handleClose, id}) {
    const [formData, setFormData] = useState({
        name: '', 
        description: '', 
        image_url: '',
    })

    const handleEditSubmit = (e) => {
        e.preventDefault();

        const updatedData = Object.fromEntries(Object.entries(formData).filter(([key, value]) => value !== ''));

        fetch('http://localhost:3000/bookclubs/'+id, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedData),
        })
        .then((resp) => {
            if (resp.ok) {
                resp.json()
            }
            else {
                console.log(resp)
            }
            })
        window.location.reload()
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit BookClub Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleEditSubmit}>
                    <Form.Group>
                        <Form.Label>Club Name</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="name" value={formData.name}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Club Description</Form.Label>
                        <Form.Control onChange={handleChange} as="textarea" rows={3} name="description" value={formData.description}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Add Cover Photo</Form.Label>
                        <Form.Control onChange={handleChange} type="text" placeholder="Enter Image URL" name="image_url" value={formData.image_url}/>
                    </Form.Group>
                <Button className="mt-2" type="submit">Save Changes</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditBookclubModal;