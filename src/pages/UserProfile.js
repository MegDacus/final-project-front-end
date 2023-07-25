import {React, useState, useContext} from 'react';
import UserContext from '../components/UserContext';
import {Container, Button, Card, Row} from 'react-bootstrap';
import placeholder from '../images/club-cover-photo.png'

function UserProfile() {
    const {user, setUser} = useContext(UserContext);


    if (!user) {
        return <p>Loading...</p>
    }

    
    return(
        <>
            <Container className="m-5">
                <h1>{user.first_name} {user.last_name}</h1>
            </Container>
            <Container className="m-5">
                <h2> Memberships:</h2>
                <Row>
                {user.memberships.map((membership) => (
                    <Card variant="light" className="m-2" style={{width: '12rem'}}>
                        <Card.Img variant="top" src={placeholder}></Card.Img>
                        <Card.Body>
                        <Card.Subtitle>{membership.bookclub_name}</Card.Subtitle>
                       </Card.Body>
                       {membership.is_host ? <Card.Text>Host</Card.Text> : null}
                    </Card>
                ))}
                </Row>
            </Container>
        </>
    )
}

export default UserProfile;