import {React, useState} from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';

function EditBookclubModal({show, handleClose}) {
    const [formData, setFormData] = useState({
        'name': '',
        'description': ''
    })

    const genreOptions = [
        { value: 'Fantasy', label: 'Fantasy'},
        { value: 'Science Fiction', label: 'Science Fiction'},
        { value: 'Romance', label: 'Romance'},
        { value: 'Horror', label: 'Horror'},
        { value: 'Non-Fiction', label: 'Non-Fiction'},
        { value: 'Contemporary Lit', label: 'Contemporary Lit'},
        { value: 'Young Adult', label: 'Young Adult'},
        { value: 'Children\s Lit', label: 'Children\'s Lit'}
    ]

    const handleEditSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
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
                        <Form.Label>Add Genres</Form.Label>
                        <CreatableSelect isMulti options={genreOptions}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Add Cover Photo</Form.Label>
                        <Form.Control type="file"/>
                    </Form.Group>
                <Button className="mt-2" type="submit">Save Changes</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditBookclubModal;