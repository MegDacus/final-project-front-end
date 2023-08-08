import {Container, Card} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';        
           
           
function PreviousBooksSlider({club}) {
    const sliderOptions = {
        renderMode: "performance",
        loop: true,
        slides: {
          perView: 3,
          spacing: 5,
        },
      };
    
    const [sliderRef, slider] = useKeenSlider(sliderOptions);

    useEffect(() => {
        slider.current?.update({
            ...sliderOptions,
          });
      },[slider, sliderOptions])

    return(
        <Container ref={sliderRef} className="keen-slider">
                {club &&
                  club.previous_books.map((book) => {
                    return (
                      <Card
                        className="keen-slider__slide align-items-center"
                        style={{ width: 100 }}
                        key={book.id}
                      >
                        <a href={`/books/${book.id}`}>
                        <Card.Img
                          style={{ width: 70, height: 100, objectFit: "cover" }}
                          variant="top"
                          src={book.image_url}
                        />
                        </a>
                      </Card>
                    );
                  })}
                <i
                  onClick={(e) =>
                    e.stopPropagation() || slider?.current?.prev()
                  }
                  className="bi arrow arrow--left bi-caret-left-fill"
                  style={{ color: "#FFFFFF"}}
                ></i>
                <i
                  onClick={(e) =>
                    e.stopPropagation() || slider?.current?.next()
                  }
                  className="bi arrow arrow--right bi-caret-right-fill"
                  style={{ color: "#FFFFFF" }}
                ></i>
            </Container>
    )
}

export default PreviousBooksSlider;
           
           
           