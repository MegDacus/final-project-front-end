import { React, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Button, Card, Image, Spinner } from "react-bootstrap";
import UserContext from "../components/UserContext";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import AddMonthlyBookForm from "../components/Club/AddMonthlyBookForm";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import EditBookclubModal from "../components/Club/EditBookclubModal";
import DiscussionQuestions from "../components/Club/DiscussionQuestions";
import AddDiscussionQuestion from "../components/Club/AddDiscussionQuestion";
import Footer from "../components/Footer";

function Club() {
  const { id } = useParams();
  const [club, setClub] = useState("");
  const user = useContext(UserContext);
  const [members, setMembers] = useState([]);
  const [membership, setMembership] = useState('');
  const [editView, setEditView] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [hostPic, setHostPic] = useState("");
  const [questions, setQuestions] = useState('');
  const sliderOptions = {
    renderMode: "performance",
    slides: {
      perView: 3,
      spacing: 5,
    },
  };

  const [sliderRef, slider] = useKeenSlider(sliderOptions);

  useEffect(() => {
    slider.current?.update({
      ...sliderOptions,
    });
  }, [slider, sliderOptions]);

  useEffect(() => {
    if (!club) {
        fetchClub();
    }
    if (club) {
        getHostProfilePic()
    }
    getMembers();
  }, [club]);

  function fetchClub() {
    fetch("http://localhost:3000/bookclubs/" + id).then((resp) =>
      resp.json().then((data) =>{ 
          setClub(data)
          setQuestions(data.discussion_questions)})
    );
  }

  async function handleJoinClick() {
    await fetch("http://localhost:3000/bookclubs/" + id + "/memberships", {
      method: "post",
      header: {
        "Content-Type": "application/json",
      },
    })
    .then((resp) => {
        if (resp.ok) {
            setMembership(true)
        }
    })
  }

  async function getHostProfilePic() {
    club.host && await fetch("http://localhost:3000/get_image/" + club.host.id)
      .then((resp) => resp.json())
      .then((data) => {
        const base64_string = ('data:image/png;base64,'+data.image_data)
        setHostPic(base64_string)
      });
  }

  async function getMembers() {
    await fetch("http://localhost:3000/bookclubs/" + id + "/memberships")
    .then((resp) => resp.json())
    .then((data) => {
        setMembers(data)
        if (data.length > 0 && user) {
            const isMember = data.some((member) => member.user_id === user.id)
            setMembership(isMember)
        }
    })
  }

  async function handleLeaveClick() {
      const membership = user.memberships.find((membership) => membership.bookclub_id === club.id)
      
      await fetch('http://localhost:3000/bookclubs/'+ id + '/memberships/'+ membership.id, {
        method: "DELETE"
      })
      .then((resp) => {
        if (resp.ok) {
            setMembership(false);
        }
      })
  }

  function handleEditClick() {
    setEditView(!editView);
    console.log(club)
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
;  }

  const genres = [
    ...(club.this_months_book?.genres.split(", ") || []), 
    ...(club.previous_books?.genres?.split(", ") || [])
    ]

  const uniqGenres = [...new Set(genres.map((genre) => genre))];

  return (
    <>
    {user ? <>
      <Image style={{ width: "100%", height: 250, "objectFit": 'cover' }} src={club.image_url} />
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
            { club && <Container className="text-center mt-3">
              <Image style={{ width: 200, height: 200, 'objectFit': 'cover' }} src={hostPic} roundedCircle></Image>
              <h5>Hosted by {club.host.username}</h5>
            </Container> }
            <Container>
              <h3>Club Info</h3>
              <p>{club.description}</p>
              <h3>Genres</h3>
              { uniqGenres.map((genre) => (<li key={genre}> {genre}</li>))}
              <h3>Previous Books:</h3>
              <Container ref={sliderRef} className="keen-slider">
                {club &&
                  club.previous_books.map((book) => {
                    return (
                      <Card
                        className="keen-slider__slide align-items-center"
                        style={{ width: 100 }}
                        key={book.id}
                      >
                        <a href={`/books/${book.id}`}>
                        <Card.Img
                          style={{ width: 70, height: 100, objectFit: "cover" }}
                          variant="top"
                          src={book.image_url}
                        />
                        </a>
                      </Card>
                    );
                  })}
                <i
                  onClick={(e) =>
                    e.stopPropagation() || slider?.current?.prev()
                  }
                  className="bi arrow arrow--left bi-caret-left-fill"
                  style={{ color: "#FFFFFF"}}
                ></i>
                <i
                  onClick={(e) =>
                    e.stopPropagation() || slider?.current?.next()
                  }
                  className="bi arrow arrow--right bi-caret-right-fill"
                  style={{ color: "#FFFFFF" }}
                ></i>
              </Container>

              {user && user.id === club.host.id ? (
                <Button
                  onClick={handleEditClick}
                  className="m-2"
                  variant="outline-secondary"
                >
                Edit Club
                </Button>
              ) : 
                membership && user.id !== club.host.id ? (
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
              <h3>This Month's Pick</h3>
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
              <h5>No Current Book</h5>
            )}
          </Container>
            { membership ? <DiscussionQuestions clubId={id} questions={questions} setQuestions={setQuestions} editView={editView}/> : null}
        </Col>
      </Container>

      <EditBookclubModal id={id} show={showEditModal} handleClose={handleClose} />
      
      <AddMonthlyBookForm show={showBookModal} handleClose={handleClose} />
    </> : <Spinner animation="border" variant="info"/>}
        <Footer/>
    </>
  );
}

export default Club;
