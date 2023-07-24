import {React, useEffect, useState} from 'react';
import { Container, Card, Row } from 'react-bootstrap';

function Library() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/books')
        .then((response) => response.json())
        .then((data) => {
            setBooks(data);
        })
        .catch((error) => {
            console.error('Error fetching data', error);
        });
    }, []);
    
    return(
        <>
            <Container className="mt-5 text-center">
                <h3>All Books</h3>
                <Container>
                    <Row className="justify-content-center">
                    {books.map((book) => (
                        <Card key={book.id} className="text-white" variant="light" border="light" style={{width: 150}}>
                                <Card.Img variant="top" src={book.image_url} thumbnail/>
                        </Card>
                    ))}
                    </Row>
                </Container>
            </Container>
        </>
    )
}

export default Library;