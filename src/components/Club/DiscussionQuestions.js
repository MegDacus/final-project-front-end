import {useState, useEffect} from 'react';
import {Container, Card, Row, Col, Button, Modal} from 'react-bootstrap';
import Comments from './Comments';
import {AiOutlineDelete} from 'react-icons/ai'

function DiscussionQuestions({questions, clubId, editView, setQuestions}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function deleteQuestion(questionId) {
        console.log(questionId)
        fetch('http://localhost:3000/bookclubs/'+clubId+'/discussion_questions/'+questionId, {
            method: "DELETE",
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error('Error deleting question')
            }
            setQuestions(questions.filter((question) => question.id !== questionId))
        })
    }
    

    return(
        <Container fluid className="mt-3 mb-2 ">
            {questions && questions.map((question) => (
                    <Container fluid key={question.id} className="mt-2">
                    <Card>
                        <Card.Header className="d-flex">
                            <Row>
                                <Col md={10}>{question.body}</Col>
                                { editView ? <Col md={2} className="d-flex justify-content-end">
                                    <Button id="delete" onClick={() => deleteQuestion(question.id)} className="p-0 m-0" style={{width: 30, height: 30}}variant="outline-secondary">
                                        <AiOutlineDelete style={{width: 15, height: 15}} />
                                    </Button>
                                </Col> : null}
                            </Row>
                        </Card.Header>
                        <Comments question={question} clubId={clubId}/>
                        </Card>
                    </Container>
            ))}

            {/* <Modal show={showDeleteModal} centered="true">
            <Modal.Header><Modal.Title>Are you sure?</Modal.Title></Modal.Header>
            <Modal.Body>
            Please select yes if you'd like to delete this discussion question.
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClick} id="yes-button" variant="outline-secondary">Yes</Button>
                <Button onClick={handleClick} id="no-button" variant="outline-secondary">Nevermind</Button>
            </Modal.Footer>
            </Modal> */}

        </Container>
    )

}

export default DiscussionQuestions;