import { useEffect, useState } from "react"
import {Button, Modal} from "react-bootstrap";

function Protected({ProtectedComponent, adminAccess}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    
    useEffect(() => {
        checkLoggedIn() 
        checkIsAdmin()
    }, [])

    const checkLoggedIn = () => {
        fetch("http://localhost:3000/me")
        .then(resp => {
            if (resp.status > 400) {
                setIsLoggedIn(false)
            } 
            else {
                setIsLoggedIn(true)
            }
        })

        .catch(err => window.location.href = "/login")
    }

    const handleClose = () => {
        window.location.href = "/"
    }
    
    const checkIsAdmin = () => {
        fetch('http://localhost:3000/me')
        .then((resp) => resp.json())
        .then((data) => {
            if (data.is_admin) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        })
    }

    if (adminAccess && isAdmin && isLoggedIn) {
        return <>{ProtectedComponent}</>
    }
    if (!adminAccess && isLoggedIn) {
        return <>{ProtectedComponent}</>
    }
    if (adminAccess && isLoggedIn && !isAdmin) {
        return <Modal
        show={!isAdmin}
        backdrop="static"
        keyboard={false}
        centered
         >
        <Modal.Header closeButton onHide={handleClose}>
          <Modal.Title>Only Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You don't have the permissions required to access this page.
        </Modal.Body>
        </Modal>
    }
    if (!isLoggedIn) {
        return <Modal
        show={!isLoggedIn}
        backdrop="static"
        keyboard={false}
        centered
            >
        <Modal.Header closeButton onHide={handleClose}>
            <Modal.Title>You aren't logged in!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            You'll need to log in to your account to access this function.
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
