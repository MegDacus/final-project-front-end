import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import HappyPlace from '../images/books/HappyPlace.jpeg';
import FourthWing from '../images/books/FourthWing.jpeg';
import JadeCity from '../images/books/JadeCity.jpeg';
import Tomorrow from '../images/books/Tomorrow.jpeg';
import TheWayofKings from '../images/books/TheWayofKings.jpeg';
import StationEleven from '../images/books/StationEleven.jpeg';
import SongofAchilles from '../images/books/SongofAchilles.jpeg';
import TheSecretHistory from '../images/books/TheSecretHistory.jpeg';
import Image from 'react-bootstrap/Image'
import { React, useState} from 'react';

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, instanceRef] = useKeenSlider(
            {
                "loop": true,
                "slides": {
                    "perView": 7,
                    "spacing": 10
                },
                slideChanged(slider) {
                    setCurrentSlide(slider.track.details.rel)
                }
            }
    )

    return(
        <div className="navigation-wrapper">
        <div ref={sliderRef} className="d-flex keen-slider">
            <div className="slider d-flex keen-slider__slide"><Image className="books" src={HappyPlace} alt="book cover" /></div>
            <div className="slider d-flex keen-slider__slide"><Image className="books" src={FourthWing} alt="book cover"/></div>
            <div className="slider d-flex keen-slider__slide"><Image className="books" src={StationEleven} alt="book cover"/></div>
            <div className="slider d-flex keen-slider__slide"><Image className="books" src={SongofAchilles} alt="book cover"/></div>
            <div className="slider d-flex keen-slider__slide"><Image className="books" src={TheWayofKings} alt="book cover"/></div>
            <div className="d-flex slider keen-slider__slide"><Image className="books" src={JadeCity} alt="book cover"/></div>
            <div className="d-flex slider keen-slider__slide"><Image className="books" src={Tomorrow} alt="book cover"/></div>
            <div className="slider d-flex keen-slider__slide"><Image className="books" src={TheSecretHistory} alt="book cover"/></div>
            <i onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()} className="bi arrow arrow--left bi-caret-left-fill" style={{color: "#FFFFFF"}}></i>
            <i onClick={(e) => e.stopPropagation() || instanceRef.current?.next()} className="bi arrow arrow--right bi-caret-right-fill" style={{color: "#FFFFFF"}}></i> 
        </div>
        </div>
    )
}

export default Carousel;