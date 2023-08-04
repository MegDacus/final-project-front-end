import { React, useEffect, useState, useContext } from "react";
import { Container, Image, Row, Dropdown, Col, Button } from "react-bootstrap";
import BookForm from '../components/Admin/BookForm';
import UserContext from "../components/UserContext";
import Footer from "../components/Footer";

function Library() {
  const [books, setBooks] = useState([]);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [sortCategory, setSortCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  useEffect(() => {
    sortBooks()
  }, [sortCategory])

  const sortBooks = () => {
    if (sortCategory === "A-Z") {
        const sorted = books.sort((a, b) => a.title.localeCompare(b.title));
        setSortedBooks(sorted)
    }
    else if (sortCategory !== "A-Z") {
        const filtered = books.filter((book) => book.genres.includes(sortCategory))
        setSortedBooks(filtered)
    }
    else {
        setSortedBooks([]);
    }
  }

  const toggleForm = () => {
    setShowModal(!showModal)}

  const handleClose = () => {
    setShowModal(false);
}
  

  return (
    <>
      <Container className="mt-5 text-center container-height">
        <Container className="mb-3 d-flex justify-content-between align-items-center">
          <Row style={{ width: "100%" }}>
            <Col>
                { user && user.is_admin ?  <Button onClick={toggleForm} variant="outline-secondary" id="bookButton" className="m-2" href="#">Add Book to Library</Button> : null}
                <BookForm setBooks={setBooks} showModal={showModal} onClose={handleClose}/>
            </Col>
            <Col>
              <h3>All Books</h3>
            </Col>
            <Col>
              {" "}
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Sort By:
                </Dropdown.Toggle>
                <Dropdown.Menu onClick={(e) => setSortCategory(e.target.text)}>
                  <Dropdown.Item>A-Z</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Genre</Dropdown.Header>
                  <Dropdown.Item>Fantasy</Dropdown.Item>
                  <Dropdown.Item>Romance</Dropdown.Item>
                  <Dropdown.Item>Science-Fiction</Dropdown.Item>
                  <Dropdown.Item>Non-Fiction</Dropdown.Item>
                  <Dropdown.Item>Classics</Dropdown.Item>
                  <Dropdown.Item>Young-Adult</Dropdown.Item>
                  <Dropdown.Item>Fiction</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center">
            {sortCategory ? (
                sortedBooks.map((book) => (
                    <Container className="m-2" style={{width: 120}} key={book.id}>
                        <a style={{cursor: "pointer"}} href={"books/" + book.id}>
                            <Image
                            style={{ width: 120, height: 180, objectFit: "cover", border: "1px solid #CADDFE" }}
                            src={book.image_url}/>
                        </a>
                    </Container>
                ))
            ) :
            (books.map((book) => (
              <Container className="m-2" style={{width: 120}} key={book.id}>
                <a style={{cursor: "pointer"}} href={"books/" + book.id}>
                  <Image
                    style={{ width: 120, height: 180, objectFit: "cover", border: "1px solid #CADDFE" }}
                    src={book.image_url}/>
                </a>
              </Container>
            )))}
          </Row>
        </Container>
      </Container>
      <Footer/>
    </>
  );
}

export default Library;
