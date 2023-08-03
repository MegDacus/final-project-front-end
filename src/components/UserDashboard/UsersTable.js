import {Modal, Table} from 'react-bootstrap';
import UserContext from '../UserContext';
import {useState, useEffect} from 'react';

function UsersTable({show, handleClose}) {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        await fetch('http://localhost:3000/users')
        .then((resp) => resp.json())
        .then((data) => {
            setUsers(data)})
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Modal show={show} onHide={handleClose} fullscreen={true}>
            <Modal.Header closeButton>
                <Modal.Title>Users</Modal.Title>
            </Modal.Header>
            <div className="m-3">
            { users && (
                <Table className="table table-bordered" responsive="md">
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
        )}
        </div>
        </Modal>
    )};
    
    

export default UsersTable;


