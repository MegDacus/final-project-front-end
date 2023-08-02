import {Container, Form, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react';

function CommentForm({question, clubId, setComments}) {
    const [comment, setComment] = useState((''))
    const questionId = question.id

    function handleChange(e) {
        setComment((e.target.value))
    }

    function handleSubmit() {
        fetch('http://localhost:3000/bookclubs/'+clubId+'/discussion_questions/'+questionId+'/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                body: comment
            })
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setComments((prevComments) => [...prevComments, data])})
    }
    return(
        <Container>
            <Form.Control onChange={handleChange} type="text" placeholder="Type Comment Here"></Form.Control>
            <Button onClick={handleSubmit} className="mt-2" variant="light">Post</Button>
        </Container>
    )
}

export default CommentForm;