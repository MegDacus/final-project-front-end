import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import {Container, Card, Button} from 'react-bootstrap';
import { React, useState, useEffect } from 'react';
import Cover from '../images/club-cover-photo.png'

function ClubCarousel({clubs}) {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, instanceRef] = useKeenSlider(
            {
                "loop": true,
                "slides": {
                    "perView": 5,
                    "loop": true
                },
                slideChanged(slider) {
                    setCurrentSlide(slider.track.details.rel)
                }
            }
    )

    useEffect(() => {
        setSlides(setClubs)
    }, [clubs])

    const setClubs = 
        clubs && clubs.map((bookclub) => (
            <Card key={bookclub.id} className="keen-slider__slide" variant="light" border="light" style={{width: 200}}>
                <Card.Img variant="top" src={Cover}/>
                <Card.Body>
                    <Card.Title>{bookclub.name}</Card.Title>
                    <Card.Text>
                        <small>{bookclub.description}</small>
                    </Card.Text>
                </Card.Body>
                    <Card.Link href={'/clubs/'+bookclub.id} >View Club</Card.Link>
            </Card>
        ))
    
    
    return(
        <Container ref={sliderRef} className="keen-slider">
            {slides}
            <i onClick={(e) => e.stopPropagation() || instanceRef?.current?.prev()} className="bi arrow arrow--left bi-caret-left-fill" style={{color: "#FFFFFF"}}></i>
            <i onClick={(e) => e.stopPropagation() || instanceRef?.current?.next()} className="bi arrow arrow--right bi-caret-right-fill" style={{color: "#FFFFFF"}}></i> 
        </Container>
    )
}

export default ClubCarousel;

