import {React, useEffect, useState} from 'react';
import { Container, Card, Row } from 'react-bootstrap';
import Footer from '../components/Footer';

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
            <Container className="mt-5 text-center container-height">
                <h3>All Books</h3>
                <Container>
                    <Row className="justify-content-center">
                    {books.map((book) => (
                        <Card key={book.id} className="text-white" variant="light" border="light" style={{width: 150}}>
                                <Card.Img variant="top" src={book.image_url} thumbnail="true"/>
                                <Card.Link href={'/'+book.id}>View</Card.Link>
                        </Card>
                    ))}
                    </Row>
                </Container>
            </Container>
            <Footer/>
        </>
    )
}

export default Library;