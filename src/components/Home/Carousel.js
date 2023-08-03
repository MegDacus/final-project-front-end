import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import HappyPlace from '../../images/books/HappyPlace.jpeg';
import FourthWing from '../../images/books/FourthWing.jpeg';
import JadeCity from '../../images/books/JadeCity.jpeg';
import Tomorrow from '../../images/books/Tomorrow.jpeg';
import TheWayofKings from '../../images/books/TheWayofKings.jpeg';
import StationEleven from '../../images/books/StationEleven.jpeg';
import SongofAchilles from '../../images/books/SongofAchilles.jpeg';
import TheSecretHistory from '../../images/books/TheSecretHistory.jpeg';
import Image from 'react-bootstrap/Image'
import { React, useState, useEffect} from 'react';

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [books, setBooks] = useState([]);
    const sliderOptions = {
        'loop': true,
        'renderMode': 'performance',
        'slides': {
            'perView': 7,
            'spacing': 2
        },
    }
    
    const [sliderRef, slider] = useKeenSlider(sliderOptions)
    
    useEffect(() => { 
            slider.current?.update({
                ...sliderOptions
            })
    }, [slider, sliderOptions])

    useEffect(() => {
        getBooks();
    }, [])

    const getBooks = () => {
        fetch('http://localhost:3000/books')
        .then((resp) => (resp.json()))
        .then((data) => {
            setBooks(data)
            console.log(data)
        })
    }

    return(
        <div className="navigation-wrapper">
        <div ref={sliderRef} className="d-flex keen-slider">
            { books && books.map((book) => (
                <div className="slider d-flex keen-slider__slide"><Image style={{width: 120, height: 180, 'objectFit': 'cover'}} className="books" src={book.image_url} alt="book cover" /></div>
            ))}
            <i onClick={(e) => e.stopPropagation() || slider.current?.prev()} className="bi arrow arrow--left bi-caret-left-fill" style={{color: "#FFFFFF"}}></i>
            <i onClick={(e) => e.stopPropagation() || slider.current?.next()} className="bi arrow arrow--right bi-caret-right-fill" style={{color: "#FFFFFF"}}></i> 
        </div>
        </div>
    )
}

export default Carousel;