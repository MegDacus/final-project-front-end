import { React, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Button, Card, Col, Image, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import UserContext from "../components/UserContext";
import EditBookModal from "../components/Library/EditBookModal";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState("");
  const user = useContext(UserContext);
  const [editBookModal, showEditBookModal] = useState(null);

  useEffect(() => {
    if (!book) {
      getBook();
    }
  }, [book]);

  const getBook = async () => {
    await fetch("http://localhost:3000/books/" + id).then((response) => {
      response.json().then((data) => setBook(data));
    });
  };

  const genres =
    book.genres && book.genres.includes(", ")
      ? book.genres.split(", ")
      : [book.genres];
    
  const handleDelete = async () => {
    await fetch("http://localhost:3000/books/"+id, {
        method: "DELETE"
    })
    .then((resp) => {
        if (resp.ok) {
            console.log("Book successfully deleted")
        }
    })
  }


  return (
    <>
      <Container className="d-flex m-5" style={{height: '78vh'}}>
        <Col md={4}>
          <Container>
            <h2>{book.title}</h2>
            <Image style={{ width: 200 }} src={book.image_url} />
            <p>Written by {book.author}</p>
            <h3>Genres</h3>
            {genres.map((genre) => (
              <li>{genre}</li>
            ))}
            <br/>
            {user && user.is_admin ? 
            <>
                <Button className="mt-2" variant="outline-secondary" onClick={() => showEditBookModal(true)}>
                    Edit Book
                </Button>
                <br/>
                <Button className="mt-2" variant="outline-secondary" onClick={handleDelete}>
                    Delete Book
                </Button>
            </>
             : null}
          </Container>
        </Col>
        <Col md={8}>
          <Container>
            <h3>Book Summary</h3>
            <p>{book.summary}</p>
          </Container>
          <Container>
            <h3>Clubs Currently Reading</h3>
            <Row>
              {book.this_months_clubs?.length > 0 ? (
                book.this_months_clubs.map((club) => (
                  <Card
                    className="m-2 text-center"
                    key={club.id}
                    style={{ width: "12rem" }}
                  >
                    <Image
                      className="m-2"
                      style={{ height: 100, objectFit: "fill" }}
                      src={club.image_url}
                    ></Image>
                    <Card.Title>{club.name}</Card.Title>
                    <Card.Text>{club.description}</Card.Text>
                    <Button
                      href={"/clubs/" + club.id}
                      variant="outline-secondary"
                      className="m-2"
                    >
                      View Club
                    </Button>
                  </Card> 
                ))): <p>There are no clubs currently reading this book.</p> }
            </Row>
          </Container>
        </Col>
        <EditBookModal show={editBookModal} setShow={showEditBookModal} book={book}/>
      </Container>
      <Footer />
    </>
  );
}

export default Book;
