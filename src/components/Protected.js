import { useEffect, useState } from "react"
import {Button, Modal} from "react-bootstrap";

function Protected({ProtectedComponent}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
        checkLoggedIn()
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

    return (
    <>
    {isLoggedIn && ProtectedComponent} 
       
       <Modal
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
    </>)
}
export default Protected;

