import {useState, useEffect} from 'react';
import {Container, Card, Row, Col, Button, Modal} from 'react-bootstrap';
import Comments from './Comments';
import {AiOutlineDelete, AiOutlinePlus} from 'react-icons/ai'
import AddDiscussionQuestion from './AddDiscussionQuestion';

function DiscussionQuestions({questions, clubId, editView, setQuestions, handleClose}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);

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
    
    function handleClose() {
        setShowQuestionModal(false);
    }

    return(
        <>
            
        <Container className="d-flex justify-content-between">
        <h4>Discussion Questions</h4>
            {editView ? (
                <Button
                  onClick={() => {setShowQuestionModal(true)}}
                  variant="outline-secondary"
                >
                  <AiOutlinePlus/>
                </Button>) : null}
          </Container>
        <Container fluid className="mt-3 mb-2 ">
            { questions.length > 0 ? (
                questions.map((question) => (
                    <Container fluid key={question.id} className="mt-2">
                    <Card>
                        <Card.Header>
                            <Row className="d-flex">
                                <Col sm={10}>{question.body}</Col>
                                { editView ? <Col sm={2} className="d-flex justify-content-end">
                                    <Button id="delete" onClick={() => deleteQuestion(question.id)} className="p-0 m-0" style={{width: 30, height: 30}}variant="outline-secondary">
                                        <AiOutlineDelete style={{width: 15, height: 15}} />
                                    </Button>
                                </Col> : null}
                            </Row>
                        </Card.Header>
                        <Comments question={question} clubId={clubId}/>
                        </Card>
                    </Container>
            ))
            ) : <p>There are not currently any discussion questions for this club.</p> }
            <AddDiscussionQuestion clubId={clubId} show={showQuestionModal} handleClose={handleClose} setQuestions={setQuestions}/>

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
        </>
    )

}

export default DiscussionQuestions;