import React from 'react';
import {Container, Button} from 'react-bootstrap';

function AdminHome() {
    return(
        <Container className="m-5">
            <Button className="m-2" href="#">Add Book to Library</Button>
            <Button className="m-2" href="#">Add Genre</Button>
            <Button className="m-2" href="#">Create new Admin User</Button>
            <Button className="m-2" href="#">Access Users</Button>
        </Container>
    )
}

export default AdminHome;