import { React, useState, useEffect} from 'react';
import NavigationBar from '../components/NavigationBar';
import Banner from '../images/clubs-banner.jpg'
import { Card, Row, Button, Container, Image } from 'react-bootstrap';
import Placeholder from '../images/image-placeholder.png'
import Footer from '../components/Footer';

function Clubs() {
    const [bookclubs, setBookclubs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/bookclubs')
        .then((response) => response.json())
        .then((data) => {
            setBookclubs(data);
        })
        .catch((error) => {
            console.error('Error fetching data', error);
        });
    }, []);

    return(
        <>
            <NavigationBar/>
            <Container className="text-center">
                <Image src={Banner} style={{height: "500px"}}/>
            </Container>
            <Container className="text-center">
                <h3>All Clubs</h3>
                <Container>
                    <Row className="justify-content-center">
                    {bookclubs.map((bookclub) => (
                        <Card key={bookclub.id} className="m-1 p-3" variant="light" border="light" style={{ width: 'calc(33.33% - 2rem)' }} >
                                <Card.Img variant="top" src={Placeholder}/>
                                <Card.Body>
                                    <Card.Title>{bookclub.name}</Card.Title>
                                    <Card.Text>{bookclub.description}</Card.Text>
                                    <Button>Join club here</Button>
                                </Card.Body>
                            </Card>
                    ))}
                    </Row>
                </Container>
            </Container>
            <Footer/>
        </>
    )
}

export default Clubs;