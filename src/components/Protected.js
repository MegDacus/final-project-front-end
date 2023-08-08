import { useEffect, useState, useContext } from "react"
import {Button, Modal} from "react-bootstrap";
import UserContext from "./UserContext";

function Protected({ProtectedComponent, loading}) {
    const user = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    
    
    const handleClose = () => {
        window.location.href = "/"
    }

    useEffect(() => {
        if (!loading && !user) {
            setShowModal(true)
        }
    }, [user, loading]);
    

    if (user) {
        return <>{ProtectedComponent}</>
    }

    if (!user) {
        return <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
        centered
            >
        <Modal.Header closeButton onHide={handleClose}>
            <Modal.Title>You aren't logged in!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            You'll need to log in to your account to access this page.
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" href="/login">
            Log In
            </Button>
            <Button variant="primary" href="/signup">Sign Up</Button>
        </Modal.Footer>
        </Modal> 
    }
    

}
export default Protected;
