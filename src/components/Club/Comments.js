import { useState, useEffect } from "react";
import {Row, Col, Card } from "react-bootstrap";
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
        <>
        <Card.Body className="p-4 overflow-auto" style={{height: comments.length > 0 ? 200 : null}}>
          <Row>
            <Col>
            {comments.length === 0 ? ( <p>No comments yet.</p>) : (
            comments.map((comment) => 
                <Comment key={comment.id} clubId={clubId} question={question} comment={comment} deleteComment={deleteComment}/>
             ))}
            </Col>
          </Row>
        </Card.Body>
        <CommentForm setComments={setComments} clubId={clubId} question={question}/>
    </>
  );
}

export default Comments;
