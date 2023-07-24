import { Container, Card, Row, Button } from "react-bootstrap";
import Placeholder from "../images/image-placeholder.png"
import React from 'react';

function FeaturedCards() {

    return(

        <Container>
            <h3 className="text-center">Featured Clubs</h3>
                <div>
                    <Row md={3} className="g-3 m-5 justify-content-center">
                        <Card className="m-1 p-3" variant="light" border="light" style={{ width: 'calc(33.33% - 2rem)' }} >
                            <Card.Img variant="top" src={Placeholder}/>
                            <Card.Body>
                                <Card.Title>Club Name</Card.Title>
                                <Card.Text>Club Description</Card.Text>
                                <Button>Join club here</Button>
                            </Card.Body>
                        </Card>
                        <Card className="m-1 p-3" variant="light" border="light" style={{ width: 'calc(33.33% - 2rem)' }}>
                            <Card.Img variant="top" src={Placeholder}/>
                            <Card.Body>
                                <Card.Title>Club Name</Card.Title>
                                <Card.Text>Club Description</Card.Text>
                                <Button>Join club here</Button>
                            </Card.Body>
                        </Card>
                        <Card className="m-1 p-3" variant="light" border="light" style={{ width: 'calc(33.33% - 2rem)' }}>
                            <Card.Img variant="top" src={Placeholder}/>
                            <Card.Body>
                                <Card.Title>Club Name</Card.Title>
                                <Card.Text>Club Description</Card.Text>
                                <Button>Join club here</Button>
                            </Card.Body>
                        </Card>
                    </Row>
                </div>
        </Container>
    )
}

export default FeaturedCards;
