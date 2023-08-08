import {useState, useEffect} from 'react';
import {Container, Button, Form, Modal} from 'react-bootstrap';


function AddDiscussionQuestion({show, handleClose, setQuestions, clubId}) {
    const [questionBody, setQuestionBody] = useState('');

    function handleChange(e) {
        setQuestionBody(e.target.value)
    }

    function handleSubmit() {
        fetch('http://localhost:3000/bookclubs/'+clubId+'/discussion_questions', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                body: questionBody
            })
        })
        .then((resp) => resp.json())
        .then((data) => {
            setQuestions((prevQuestions) => [...prevQuestions, data])})
            handleClose();
    }
    
   
    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>Add Discussion Question</Modal.Header>
            <Modal.Body>
                <Form.Control type="text" placeholder="Enter Question Here" onChange={handleChange}/>
                <Button onClick={handleSubmit} variant="outline-secondary" className="mt-2">Post</Button>
            </Modal.Body>
        </Modal>
    )
};

export default AddDiscussionQuestion;