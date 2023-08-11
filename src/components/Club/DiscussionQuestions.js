import { useState, useEffect } from "react";
import { Container, Modal, Col, Button, Accordion } from "react-bootstrap";
import Comments from "./Comments";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import AddDiscussionQuestion from "./AddDiscussionQuestion";

function DiscussionQuestions({
  questions,
  clubId,
  editView,
  setQuestions,
  handleClose,
  membership,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  function deleteQuestion(questionId) {
    console.log(questionId);
    fetch(
      "http://localhost:3000/bookclubs/" +
        clubId +
        "/discussion_questions/" +
        questionId,
      {
        method: "DELETE",
      }
    ).then((resp) => {
      if (!resp.ok) {
        throw new Error("Error deleting question");
      }
      setQuestions(questions.filter((question) => question.id !== questionId));
    });
  }

  function handleClose() {
    setShowQuestionModal(false);
    setShowDeleteModal(false);
  }

  function handleClick() {
    setShowDeleteModal(true);
  }

  function handleModalClick(e, questionId) {
    if (e.target.id === "yes-button") {
        deleteQuestion(questionId)
        handleClose()
    }
    if (e.target.id === "no-button") {
        handleClose()
    }
  }

  return (
    <>
      <Container className="d-flex justify-content-between m-2">
        <h4>Discussion Questions</h4>
        {editView ? (
          <Button
            onClick={() => {
              setShowQuestionModal(true);
            }}
            variant="outline-secondary"
          >
            <AiOutlinePlus />
          </Button>
        ) : null}
      </Container>
      {membership ? (
        <Container className="mt-3 mb-2 ">
          {questions.length > 0 ? (
            questions.map((question) => (
              <Accordion
                flush
                defaultActiveKey={null}
                key={question.id}
                className="mt-2"
              >
                <Accordion.Item>
                  <Accordion.Header className="d-flex">
                    {editView ? (
                      <Col sm={2} className="d-flex justify-content-start">
                        <Button
                          id="delete"
                          onClick={handleClick}
                          className="p-0 m-0"
                          style={{ width: 30, height: 30 }}
                          variant="outline-secondary"
                        >
                          <AiOutlineDelete style={{ width: 15, height: 15 }} />
                        </Button>
                      </Col>
                    ) : null}
                    <Col sm={10}><p className="bold-header">{question.body}</p></Col>
                  </Accordion.Header>
                  <Accordion.Body
                    className="m-2"
                    style={{
                      border: "1px solid #cccccc",
                      borderRadius: "25px",
                    }}
                  >
                    <Comments question={question} clubId={clubId} />
                  </Accordion.Body>
                </Accordion.Item>

                <Modal show={showDeleteModal} centered="true">
                  <Modal.Header>
                    <Modal.Title>Are you sure?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Please select yes if you'd like to delete this discussion
                    question.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={(e) => handleModalClick(e, question.id)}
                      id="yes-button"
                      variant="outline-secondary"
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={handleModalClick}
                      id="no-button"
                      variant="outline-secondary"
                    >
                      Nevermind
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Accordion>
            ))
          ) : (
            <p className="text-muted">
              There are not currently any discussion questions for this club.
            </p>
          )}
          <AddDiscussionQuestion
            clubId={clubId}
            show={showQuestionModal}
            handleClose={handleClose}
            setQuestions={setQuestions}
          />
        </Container>
      ) : (
        <p className="m-3 text-muted">
          {" "}
          You must be a member of this club to view discussion questions
        </p>
      )}
    </>
  );
}

export default DiscussionQuestions;
