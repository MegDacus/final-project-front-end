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
    }, [])

    function handleClick() {
        fetch('http://localhost:3000/bookclubs/'+id+'/memberships', {
            method: "post",
            header: {
                "Content-Type": "application/json",
            }})
        .then((resp) => console.log(resp))
        
    }

    return(
        <>
            <Image style={{width: "100%"}}src={Banner}/>
            <Container className="d-flex mt-5">
            <Col md={5}>
                <Container>
                    <h2>{club.name}</h2>
                    <Image style={{width: 200}} src={Placeholder} roundedCircle></Image>
                    <h5>Hosted by {club.host}</h5>
                    <h3>Club Info</h3>
                    <p>{club.description}</p>
                    <h3>Genres</h3>
                </Container>
                <Button onClick={handleClick} className="m-2" variant="outline-secondary">Join Club</Button>
            </Col>
            <Col className="mr-3"  md={8}>
                <Container>
                    <h3>This Month's Pick</h3>
                    { club.this_months_book ?
                    <Container>
                            <Image className="float-start m-2" style={{height: 200 }} src={club.this_months_book.image_url}></Image>
                            <h5>{club.this_months_book.title} by {club.this_months_book.author}</h5>
                            <p>{club.this_months_book.summary}</p>
                    </Container> : <h5>No Current Book</h5> }
                </Container>
                    {club.memberships ? 
                <Container>
                    <h3>Current Club Members:</h3>
                </Container> : null }
                { club.previous_books ? 
                <Container>
                    <h3>Previous Books:</h3>
                    {club.previous_books.map((book) => {
                        return <Card className="align-items-center" style={{width: 150}} key={book.id}>
                            <Card.Img variant="top" src={book.image_url}/>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Subtitle>{book.author}</Card.Subtitle>
                        </Card>
                    })}
                </Container> : null }
            </Col>
        </Container>
    </>
    )
}

export default Club;