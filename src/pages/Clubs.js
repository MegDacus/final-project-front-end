import { useState, useEffect, React } from 'react';
import { Row, Container} from 'react-bootstrap';
import Footer from '../components/Footer';
import ClubCarousel from '../components/ClubCarousel';
import NavbarMain from '../components/NavbarMain';

function Clubs() {
    const [newBookclubs, setNewBookclubs ] = useState([])
    const [fantasyBookclubs, setFantasyBookclubs] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/bookclubs')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setNewBookclubs(data);
        })
        .catch((error) => {
            console.error('Error fetching data', error);
        });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/genres/1')
        .then((response) => response.json())
        .then((data) => {
            setFantasyBookclubs(data.bookclubs)
        })
        .catch((error) => {
            console.error('Error fetching data', error);
        });
    }, []);

    return(
        <>
            <Container>
                <Container>
                    <h3 className="text-center mt-5 m-3">Newest Clubs</h3>  
                    <Row>
                        <ClubCarousel/>
                    </Row>
                    <h3 className="text-center m-3">Fantasy Clubs</h3>
                    <Row>
                        <ClubCarousel/>
                    </Row>
                    <h3 className="text-center m-3">Romance Clubs</h3>
                    <Row className="mb-5">
                        <ClubCarousel/>
                    </Row>
                </Container>
            </Container>
            <Footer/>
        </>
    )
}

export default Clubs;