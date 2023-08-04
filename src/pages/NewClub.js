import {React, useContext, useState} from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import UserContext from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function NewClub() {
    const user = useContext(UserContext);
    const [formDetails, setFormDetails] = useState({
        "name": "",
        "description": "",
        "image_url": "",
    })
    const [clubId, setClubId] = useState('');
    const navigate = useNavigate();

    function handleChange(e) {
        setFormDetails({
            ...formDetails,
            [e.target.name]: e.target.value,
            host_user_id: user.id
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        fetch('http://localhost:3000/bookclubs', {
            method: 'post', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formDetails),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setClubId(data.id)
            navigate(`/clubs/${data.id}`)
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }



    return(
        <>  
            <Container style={{width: 500}} className="container-height">
                <h3 className="text-center m-5">Create A Club</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Club Name</Form.Label>
                        <Form.Control 
                            onChange={handleChange}
                            type="name" 
                            name="name" 
                            placeholder="Enter name of your club"
                            value={formDetails.name}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            onChange={handleChange}
                            as="textarea" 
                            name="description" 
                            rows={3} 
                            placeholder="Tell us about your club"
                            value={formDetails.description}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Club Cover Photo</Form.Label>
                        <Form.Control 
                        onChange={handleChange} 
                        name="image_url" 
                        value={formDetails.image_url}
                        type="text" 
                        placeholder="Enter Image URL here"/>
                    </Form.Group>
                    <br/>
                    <Button variant="outline-secondary" type="submit">Create Club</Button>
                </Form>
            </Container>
            <Footer/>
        </>
    )
}

export default NewClub;