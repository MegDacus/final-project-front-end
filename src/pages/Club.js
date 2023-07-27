import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Col, Button, Card, Image} from 'react-bootstrap';
import Placeholder from '../images/new-placeholder.png'
import Banner from '../images/book-banner.jpg'

function Club() {
    const {id} = useParams();
    const [club, setClub] = useState("");

    useEffect(() => {
        fetch('http://localhost:3000/bookclubs/'+id)
        .then((resp) => resp.json().then((data) => setClub(data)))
    })

    return(
        <>
            <Image style={{width: "100%"}}src={Banner}/>
            <Container className="d-flex mt-5">
            <Col md={4}>
                <Container>
                    <h2>{club.name}</h2>
                    <Image style={{width: 200}} src={Placeholder} roundedCircle></Image>
                    <h4>Hosted by HOST NAME</h4>
                    <h3>Genres</h3>
                </Container>
                <Button className="m-2" variant="outline-secondary">Join Club</Button>
            </Col>
            <Col className="mr-3"  md={8}>
                <Container>
                    <h3>This Month's Pick</h3>
                    <Container className="">
                        <Image className="float-start m-2" style={{height: 200 }} src={club && club.this_months_book.image_url}></Image>
                            <h5>{club && club.this_months_book.title} by {club && club.this_months_book.author}</h5>
                            <p>{club && club.this_months_book.summary}</p>
                    </Container>
                </Container>
                <Container>
                    <h3>Current Club Members:</h3>
                </Container>
                <Container>
                    <h3>Previous Books:</h3>
                    {club && club.previous_books.map((book) => {
                        return <Card className="align-items-center" style={{width: 150}} key={book.id}>
                            <Card.Img variant="top" src={book.image_url}/>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Subtitle>{book.author}</Card.Subtitle>
                        </Card>
                    })}
                </Container>
            </Col>
        </Container>
    </>
    )
}

export default Club;