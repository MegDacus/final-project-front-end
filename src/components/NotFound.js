import {Button, Container} from 'react-bootstrap';

function NotFound() {
    return(
        <Container className="d-flex align-items-center justify-content-center" style={{height: '87vh'}}>
        <Container className="m-3 text-center">
            <h1> Page not found</h1>
            <h4> Oh no! We can't seem to find the page you are looking for. Try heading to our home page and navigating from there.</h4>
            <Button href="/">Curiouser Home</Button>
        </Container>
        </Container>
    )
}

export default NotFound;