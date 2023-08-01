import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import {Container, Card, Button} from 'react-bootstrap';
import { React, useState, useEffect } from 'react';
import Cover from '../images/club-cover-photo.png'

function ClubCarousel({clubs}) {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0)
    const sliderOptions = {
            'loop': true,
            'renderMode': 'performance',
            'slides': {
                'perView': 5,
                'spacing': 2
            },
    }
        
    const [sliderRef, slider] = useKeenSlider(sliderOptions)
        
    useEffect(() => { 
        slider.current?.update({
            ...sliderOptions
        })
    }, [slider, sliderOptions])

 
    
    
    return(
        <Container ref={sliderRef} className="keen-slider">
            {clubs && clubs.map((bookclub) => (
                <Card key={bookclub.id} className="keen-slider__slide" variant="light" border="light" style={{width: 200}}>
                    <Card.Img variant="top" src={bookclub.image_url}/>
                    <Card.Body>
                        <Card.Title>{bookclub.name}</Card.Title>
                        <Card.Text>
                            <small>{bookclub.description}</small>
                        </Card.Text>
                    </Card.Body>
                        <Card.Link href={'/clubs/'+bookclub.id} >View Club</Card.Link>
                </Card>
            ))}
            <i onClick={(e) => e.stopPropagation() || slider?.current?.prev()} className="bi arrow arrow--left bi-caret-left-fill" style={{color: "#FFFFFF"}}></i>
            <i onClick={(e) => e.stopPropagation() || slider?.current?.next()} className="bi arrow arrow--right bi-caret-right-fill" style={{color: "#FFFFFF"}}></i> 
        </Container>
    )
}

export default ClubCarousel;

