import {React, useState, useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Col, Button, Card, Image} from 'react-bootstrap';
import Placeholder from '../images/new-placeholder.png'
import Banner from '../images/book-banner.jpg'
import UserContext from '../components/UserContext';
import {AiOutlineEdit} from 'react-icons/ai';
import AddMonthlyBookForm from '../components/AddMonthlyBookForm';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import EditBookclubModal from '../components/EditBookclubModal';

function Club() {
    const {id} = useParams();
    const [club, setClub] = useState("");
    const {user} = useContext(UserContext);
    const [editView, setEditView] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showBookModal, setShowBookModal] = useState(false);
    const sliderOptions = {
        'renderMode': 'performance',
        'slides': {
            'perView': 3,
            'spacing': 5
        },
    }
    
    const [sliderRef, slider] = useKeenSlider(sliderOptions)
    
    useEffect(() => { 
            slider.current?.update({
                ...sliderOptions
            })
    }, [slider, sliderOptions])

    useEffect(() => {
        async function fetchClub() {
        await fetch('http://localhost:3000/bookclubs/'+id)
        .then((resp) => resp.json().then((data) => setClub(data)))
        }
        fetchClub();
        console.log(club)
    }, [])

    async function handleJoinClick() {
        await fetch('http://localhost:3000/bookclubs/'+id+'/memberships', {
            method: "post",
            header: {
                "Content-Type": "application/json",
            }})
        .then((resp) => console.log(resp))
        
    }

    function handleEditClick() {
        setEditView(!editView);
    }

    function handleEditSubmit(formData) {
   
    }

    function handleEditDetailsClick() {
        setShowEditModal(true);
    }

    function handleBookClick() {
        setShowBookModal(true);
    }

    function handleClose() {
        setShowBookModal(false);
        setShowEditModal(false);
    }

    return(
        <>
            <Image style={{width: "100%"}}src={Banner}/>
            <Container className="d-flex mt-5">
            <Col md={5} lg={5}>
                <Container>
                    <Container className="mt-2 d-flex justify-content-between">
                        <h2>{club.name}</h2> 
                        {editView ? <Button onClick={handleEditDetailsClick} variant="outline-secondary"><AiOutlineEdit/></Button> : null}
                    </Container>
                    <Container className="text-center mt-3 mb-3">
                        <Image style={{width: 200}} src={Placeholder} roundedCircle></Image>
                        <h5>Hosted by {club.host}</h5>
                    </Container>
                    <Container>
                        <h3>Club Info</h3>
                        <p>{club.description}</p>
                        <h3>Genres</h3>
                        {club.memberships ? 
                        <Container>
                        <h3>Current Club Members:</h3>
                        </Container> : null }
                        <h3>Previous Books:</h3>
                        <Container ref={sliderRef} className="keen-slider">
                            {club && club.previous_books.map((book) => {
                                return <Card className="keen-slider__slide align-items-center" style={{width: 100}} key={book.id}>
                                    <Card.Img style={{width: 70, height: 100, 'objectFit': 'cover'}} variant="top" src={book.image_url}/>
                                </Card>
                            })}
                            <i onClick={(e) => e.stopPropagation() || slider?.current?.prev()} className="bi arrow arrow--left bi-caret-left-fill" style={{color: "#FFFFFF"}}></i>
                            <i onClick={(e) => e.stopPropagation() || slider?.current?.next()} className="bi arrow arrow--right bi-caret-right-fill" style={{color: "#FFFFFF"}}></i> 
                        </Container>
                        
                        { user && user.username == club.host ? <Button onClick={handleEditClick} className="m-2" variant="outline-secondary">Edit Club</Button> : <Button onClick={handleJoinClick} className="m-2" variant="outline-secondary">Join Club</Button> }
                    </Container>
                </Container>
            </Col>
            <Col className="pr-3"  md={8} lg={8}>
                <Container>
                    <Container className="d-flex justify-content-between p-2">
                    <h3>This Month's Pick</h3>
                    { editView ? 
                        <Button onClick={handleBookClick} variant="outline-secondary" className="mr-auto">Add Next Book</Button> 
                    : null}
                    </Container>
                    { club.this_months_book ?
                    <Container>
                            <Image className="float-start p-2" style={{height: 200 }} src={club.this_months_book.image_url}></Image>
                            <h5>{club.this_months_book.title} by {club.this_months_book.author}</h5>
                            <p>{club.this_months_book.summary}</p>
                    </Container> : <h5>No Current Book</h5> }
                </Container>
               
            </Col>
        </Container>

        <EditBookclubModal show={showEditModal} handleClose={handleClose}/>

        <AddMonthlyBookForm show={showBookModal} handleClose={handleClose}/>

      
    </>)
}

export default Club;