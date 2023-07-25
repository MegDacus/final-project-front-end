import React from 'react';
import {Container, Button} from 'react-bootstrap';

function AdminHome() {
    return(
        <Container>
            <Button href="#">Add Book to Library</Button>
            <Button href="#">Add Genre</Button>
            <Button href="#">Create new Admin User</Button>
            <Button href="#">Access Users</Button>
        </Container>
    )
}

export default AdminHome;