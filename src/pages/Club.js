import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Button, Image, Spinner } from "react-bootstrap";
import UserContext from "../components/UserContext";
import { AiOutlineEdit } from "react-icons/ai";
import AddMonthlyBookForm from "../components/Club/AddMonthlyBookForm";
import EditBookclubModal from "../components/Club/EditBookclubModal";
import DiscussionQuestions from "../components/Club/DiscussionQuestions";
import Footer from "../components/Footer";
import PreviousBooksSlider from "../components/Club/PreviousBooksSlider";
import NoPickImage from "../images/monthly-placeholder.jpg";

function Club() {
  // STATE VARIABLES //
  const { id } = useParams();
  const [club, setClub] = useState("");
  const user = useContext(UserContext);
  const [membership, setMembership] = useState(false);
  const [editView, setEditView] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [hostPic, setHostPic] = useState("");
  const [questions, setQuestions] = useState("");

  useEffect(() => {
    if (!club) {
        fetchClub()
    }
    if (user) {
      checkMembership();
    }
  }, [user]);

  async function fetchClub() {
    await fetch("http://localhost:3000/bookclubs/" + id)
      .then((resp) => resp.json())
      .then((data) => {
        setClub(data);
        setQuestions(data.discussion_questions);
        if (data.host) {
          getHostProfilePic(data.host.id);
          user?.id === data.host.id ? setEditView(true) : setEditView(false)
        }
      });
  }

  async function getHostProfilePic(hostId) {
    const resp = await fetch("http://localhost:3000/get_image/" + hostId);
    const data = await resp.json();
    const base64String = `data:image/png;base64,${data.image_data}`;
    setHostPic(base64String);
  }

  async function checkMembership() {
    await fetch("http://localhost:3000/bookclubs/" + id + "/memberships")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        const isMember = data.some((member) => member.user.id === user?.id);
        setMembership(isMember);
        

      })
  }

  async function handleJoinClick() {
    const resp = await fetch(
      "http://localhost:3000/bookclubs/" + id + "/memberships",
      {
        method: "post",
        header: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.ok) {
      setMembership(true);
    }
  }

  async function handleLeaveClick() {
    const membership = user?.memberships.find(
      (membership) => membership.bookclub_id === club.id
    );
    if (membership) {
      await fetch(
        "http://localhost:3000/bookclubs/" +
          id +
          "/memberships/" +
          membership.id,
        {
          method: "DELETE",
        }
      );
      setMembership(false);
    }
  }

  function handleEditClick() {
    setEditView(!editView);
  }

  function handleEditDetailsClick() {
    setShowEditModal(true);
  }

  function handleBookClick() {
    setShowBookModal(true);
  }

  function handleClose() {
    setShowBookModal(false);
    setShowEditModal(false);
  }

  function getUniqueGenres() {
    const genres = [
      ...(club.this_months_book?.genres.split(", ") || []),
      ...(club.previous_books?.genres?.split(", ") || []),
    ];
    return [...new Set(genres.map((genre) => genre))];
  }

  return (
    <>
      {user && club ? (
        <>
          <Image
            style={{ width: "100%", height: 250, objectFit: "cover" }}
            src={club.image_url}
          />
          <Container className="d-flex mt-5 mb-5">
            <Col md={5} lg={5}>
              <Container>
                <Container className="mt-2 d-flex justify-content-between">
                  <h2>{club.name}</h2>
                  {editView ? (
                    <Button
                      onClick={handleEditDetailsClick}
                      variant="outline-secondary"
                    >
                      <AiOutlineEdit />
                    </Button>
                  ) : null}
                </Container>
                
                  <Container className="text-center mt-3">
                    <Image
                      style={{ width: 200, height: 200, objectFit: "cover" }}
                      src={hostPic}
                      roundedCircle
                    ></Image>
                    <h5>Hosted by {club.host.username}</h5>
                  </Container>
                
                <Container>
                  <h4>Club Info</h4>
                  <p>{club.description}</p>
                  <h4>Genres</h4>
                  {getUniqueGenres().map((genre) => (
                    <li key={genre}> {genre}</li>
                  ))}
                  <h4>Previous Books:</h4>
                  <PreviousBooksSlider club={club} />

                  {user.id === club.host.id ? (
                    <Button
                      onClick={handleEditClick}
                      className="m-2"
                      variant="outline-secondary"
                    >
                      {editView ? "View as Member" : "View Edit Mode"}
                    </Button>
                  ) : membership && user.id !== club.host.id ? (
                    <Button
                      onClick={handleLeaveClick}
                      className="m-2"
                      variant="outline-secondary"
                    >
                      Leave Club
                    </Button>
                  ) : (
                    <Button
                      onClick={handleJoinClick}
                      className="m-2"
                      variant="outline-secondary"
                    >
                      Join Club
                    </Button>
                  )}
                </Container>
              </Container>
            </Col>
            <Col className="pr-3" md={8} lg={8}>
              <Container>
                <Container className="d-flex justify-content-between p-2">
                  <h4>This Month's Pick</h4>
                  {editView ? (
                    <Button
                      onClick={handleBookClick}
                      variant="outline-secondary"
                      className="mr-auto"
                    >
                      Add Next Book
                    </Button>
                  ) : null}
                </Container>
                {club.this_months_book ? (
                  <Container className="p-2" fluid>
                    <Image
                      className="float-start p-2"
                      style={{ height: 200 }}
                      src={club.this_months_book.image_url}
                    ></Image>
                    <h5>
                      {club.this_months_book.title} by{" "}
                      {club.this_months_book.author}
                    </h5>
                    <p>{club.this_months_book.summary}</p>
                  </Container>
                ) : (
                    <Container className="text-center">
                    <Image src={NoPickImage} style={{height: 250, width: "100%", "objectFit": "cover"}}/>
                    <p className="m-2">The host has not yet chosen a book for this month.</p>
                    </Container>
                )}
              </Container>
              <DiscussionQuestions
                clubId={id}
                questions={questions}
                setQuestions={setQuestions}
                editView={editView}
                membership={membership}
              />
            </Col>
          </Container>

          <EditBookclubModal
            id={id}
            show={showEditModal}
            handleClose={handleClose}
          />

          <AddMonthlyBookForm show={showBookModal} handleClose={handleClose} />
        </>
      ) : (
        <Spinner animation="border" variant="info" />
      )}
      <Footer />
    </>
  );
}

export default Club;
