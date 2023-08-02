import {React, useState, useEffect} from 'react';
import {Container, Button, Table} from 'react-bootstrap';
import BookForm from '../components/Admin/BookForm';
import AdminSignupModal from '../components/Admin/AdminSignupModal';

function AdminHome() {
    const [showForm, setShowForm] = useState(false);
    const [showAdminForm, setShowAdminForm] = useState(false);
    const [users, setUsers] = useState('');
    const [showUsers, setShowUsers] = useState(false);

    const toggleForm = (e) => {
        if (e.target.id === "bookButton") {setShowForm(!showForm)}
        else if (e.target.id === "adminButton") {setShowAdminForm(!showAdminForm)}
        else if (e.target.id === "usersButton") {setShowUsers(!showUsers)};
    }

    const getUsers = async () => {
        await fetch('http://localhost:3000/users')
        .then((resp) => resp.json())
        .then((data) => {
            setUsers(data)})
    }

    useEffect(() => {
        if (showUsers) {
            getUsers();
        }
    }, [showUsers])

    return(
        <>
        <Container className="m-5">
            <Button onClick={toggleForm} id="bookButton" className="m-2" href="#">Add Book to Library</Button>
            <Button className="m-2" href="#">Add Genre</Button>
            <Button onClick={toggleForm} id="adminButton" className="m-2" href="#">Create new Admin User</Button>
            <Button onClick={toggleForm} id="usersButton" className="m-2" href="#">Access Users</Button>
        </Container>
        <Container>
            {showForm && (
                <BookForm/>
            )}
            {showAdminForm && (
                <AdminSignupModal/>
            )}
            {showUsers && users && (
                <Container>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Admin?</th>
                                <th>Hosted Bookclubs</th>
                                <th>Member Bookclubs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.is_admin.toString()}</td>
                                    <td>
                                        {user.bookclubs
                                            .filter((club) => club.host.id === user.id)
                                            .map((club) => club.name)
                                            .join(', ') || 'None'}
                                    </td>
                                    <td>
                                    {user.bookclubs
                                            .filter((club) => club.host.id !== user.id)
                                            .map((club) => club.name)
                                            .join(', ') || 'None'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            )}
        </Container>
        </>
    )
}

export default AdminHome;