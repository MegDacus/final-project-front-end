import {useState, useEffect} from 'react';
import {Container, Button, Form, Modal} from 'react-bootstrap';

function AddDiscussionQuestion({show, handleClose}) {
    const [question, setQuestion] = useState('');

    function handleChange(e) {
        setQuestion(e.target.value)
    }

    function handleSubmit() {
        console.log(question)
    }
   
    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>Add Discussion Question</Modal.Header>
            <Modal.Body>
                <Form.Control type="text" placeholder="Enter Question Here" onChange={handleChange}/>
                <Button onClick={handleSubmit} variant="light" className="mt-2">Post</Button>
            </Modal.Body>
        </Modal>
    )
}

export default AddDiscussionQuestion;