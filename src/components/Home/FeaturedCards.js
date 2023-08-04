import { Container, Card, Row, Button } from "react-bootstrap";
import Placeholder from "../../images/search-banner.jpg"
import {useState, useEffect, useContext} from 'react';
import arrayShuffle from 'array-shuffle';
import UserContext from "../UserContext";

function FeaturedCards() {
    const [featuredClubs, setFeaturedClubs] = useState([]);
    const user = useContext(UserContext);

    useEffect(() => {
        getClubs()
    }, [])

    const getClubs = () => {
        fetch('http://localhost:3000/bookclubs')
        .then((resp) => resp.json())
        .then((data) => {
            const shuffled = arrayShuffle(data)
            const selectedClubs = shuffled.slice(0, 3);
            setFeaturedClubs(selectedClubs)
        })
    }

    return(

        <Container>
            <h3 className="text-center">Featured Clubs</h3>
                <div>
                    <Row md={3} className="g-3 m-5 justify-content-center">
                        {featuredClubs.map((club => (
                        <Card key={club.id} className="m-1 p-3" style={{ width: 'calc(33.33% - 2rem)' }} >
                        <Card.Img style={{height: 80, "objectFit": "cover"}} variant="top" src={club.image_url ? club.image_url : Placeholder}/>
                        <Card.Body>
                            <Card.Title>{club.name}</Card.Title>
                            <Card.Text>{club.description}</Card.Text>
                        </Card.Body>
                        { user ? 
                        <Button variant="outline-secondary" href={"/clubs/"+club.id}>View club here</Button>
                        : <Button variant="outline-secondary" href={"/login"}>Log in to view</Button>}
                        </Card>
                        )))}
                    </Row>
                </div>
        </Container>
    )
}

export default FeaturedCards;
