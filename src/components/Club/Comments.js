import { useState, useEffect } from "react";
import { Container, Row, Col, Card, CloseButton, Accordion } from "react-bootstrap";
import Comment from './Comment';
import CommentForm from './CommentForm';

function Comments({ clubId, question }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    fetch(
      "http://localhost:3000/bookclubs/" +
        clubId +
        "/discussion_questions/" +
        question.id +
        "/comments"
    )
      .then((resp) => resp.json())
      .then((comments) => setComments(comments));
  };

  const deleteComment = (commentId) => {
    fetch('http://localhost:3000/bookclubs/'+clubId+'/discussion_questions/'+question.id+'/comments/'+commentId, {
        method: "DELETE",
    })
    .then((resp) => {
        if (!resp.ok) {
            throw new Error('Error deleting comment')
        }
        setComments(comments.filter((comment) => comment.id !== commentId))
    })
}

  return (
    <Container className="mt-2" style={{ width: "100%" }}>
      <Card>
        <Card.Body className="p-4">
          <Row>
            <Col>
            {comments.length === 0 ? ( <p>No comments yet.</p>) : (
            comments.map((comment) => 
                <Comment key={comment.id} clubId={clubId} question={question} comment={comment} deleteComment={deleteComment}/>
             ))}
            </Col>
          </Row>
        </Card.Body>
        <Accordion>
            <Accordion.Item eventKey="0" >
                <Accordion.Header>Add Comment</Accordion.Header>
                <Accordion.Body>
                    <CommentForm setComments={setComments} clubId={clubId} question={question}/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
      </Card>
    </Container>
  );
}

export default Comments;
