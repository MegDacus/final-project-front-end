import {React, useState} from 'react';
import {Container, Button} from 'react-bootstrap';
import BookForm from '../components/BookForm';

function AdminHome() {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    return(
        <>
        <Container className="m-5">
            <Button onClick={toggleForm} className="m-2" href="#">Add Book to Library</Button>
            <Button className="m-2" href="#">Add Genre</Button>
            <Button className="m-2" href="#">Create new Admin User</Button>
            <Button className="m-2" href="#">Access Users</Button>
        </Container>
        <Container>
            {showForm && (
                <BookForm/>
            )}
        </Container>
        </>
    )
}

export default AdminHome;