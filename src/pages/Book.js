import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Button, Card, Col, Image} from 'react-bootstrap';

function Book() {
    const {id} = useParams();
    const [book, setBook] = useState('');

    useEffect(() => {
        if (!book) {
            getBook()
        }
    }, [book]);

    const getBook = async () => {
       await fetch('http://localhost:3000/books/'+ id)
        .then((response) => {
            response.json().then((data) => (setBook(data)))
        });
    }

    const genres = book.genres && book.genres.includes(', ') ? book.genres.split(', ') : [book.genres];


    return(
        <Container fluid className="d-flex mt-5 align-items-center">
            <Col md="true">
                <Container>
                    <h2>{book.title}</h2>
                    <Image style={{width: 200}} src={book.image_url}/>
                    <p>Written by {book.author}</p>
                    <h3>Genres</h3>
                    { genres.map((genre) => (<li>{genre}</li>))}
                    <br/>
                    <Button variant="outline-secondary">Start Club With This Book</Button>
                </Container>
            </Col>
            <Col md="true" className="mr-3">
                <Container>
                <h3>Book Summary</h3>
                <p>{book.summary}</p>
                </Container>
                <Container>
                    <h3>Bookclubs Currently Reading</h3>
                    {book.bookclubs && book.bookclubs.map((club => {
                       return <Card key={club.id} style={{width: 200}}>
                        <Card.Title>{club.name}</Card.Title>
                        <Card.Text>{club.description}</Card.Text>
                        </Card>
                    }))}
                </Container>
            </Col>
       </Container>
    )};

export default Book;