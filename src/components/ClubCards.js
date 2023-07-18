import { Container, Card, Row } from "react-bootstrap";
import Placeholder from "../images/image-placeholder.png"

function ClubCards() {

    return(

        <Container>
            <h3 className="text-center">Featured Clubs</h3>
                <div>
                    <Row md={3} className="g-3 m-5">
                        <Card className="p-3" variant="light" border="light">
                            <Card.Img variant="top" src={Placeholder}/>
                            <Card.Body>
                                <Card.Title>Club Name</Card.Title>
                                <Card.Text>Club Description</Card.Text>
                                <Card.Footer>Join club here</Card.Footer>
                            </Card.Body>
                        </Card>
                        <Card className="p-3" variant="light" border="light">
                            <Card.Img variant="top" src={Placeholder}/>
                            <Card.Body>
                                <Card.Title>Club Name</Card.Title>
                                <Card.Text>Club Description</Card.Text>
                                <Card.Footer>Join club here</Card.Footer>
                            </Card.Body>
                        </Card>
                        <Card className="p-3" variant="light" border="light">
                            <Card.Img variant="top" src={Placeholder}/>
                            <Card.Body>
                                <Card.Title>Club Name</Card.Title>
                                <Card.Text>Club Description</Card.Text>
                                <Card.Footer>Join club here</Card.Footer>
                            </Card.Body>
                        </Card>
                    </Row>
                </div>
        </Container>
    )
}

export default ClubCards;
