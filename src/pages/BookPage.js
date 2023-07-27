import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Button, Card, Col, Image} from 'react-bootstrap';

function BookPage() {
    const {id} = useParams();
    const [book, setBook] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/books/'+ id)
        .then((response) => {
            response.json().then((data) => {
                setBook(data);
            })
        });

    }, []);


    return(
        <Container fluid className="d-flex mt-5 align-items-">
            <Col md="true">
                <Container>
                    <h2>{book.title}</h2>
                    <Image style={{width: 200}} src={book.image_url}/>
                    <p>Written by {book.author}</p>
                    <h3>Genres</h3>
                    {/* Add genres as a column to the books table instead of its own table */}
                    <li>Romance</li>
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
                    {book && book.bookclubs.map((club => {
                       return <Card key={club.id} style={{width: 200}}>
                        <Card.Title>{club.name}</Card.Title>
                        <Card.Text>{club.description}</Card.Text>
                        </Card>
                    }))}
                </Container>
            </Col>
       </Container>
    )}
export default BookPage;