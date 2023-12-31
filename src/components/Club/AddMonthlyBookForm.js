import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Modal, Image, InputGroup, Form, Button, Container, Card, Row, Col} from 'react-bootstrap';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

function AddMonthlyBookForm({show, handleClose}) {
    const [books, setBooks] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchMode, setSearchMode] = useState('title');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [year, setYear] = useState('');
    const {id} = useParams();
    
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

    useEffect(() => {
        getBooks();
    }, [])

    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    }
    
    const handleClear = () => {
        setSearchQuery('');
        setSearchMode('title');
        filterBooks();
    }

    const handleTitleSearch = () => {
        setSearchMode('title')
        filterBooks();
    }

    const handleAuthorSearch = () => {
        setSearchMode('author')
        filterBooks();
    }

    const getBooks = async () => {
        await fetch('http://localhost:3000/books')
        .then((resp) => resp.json())
        .then((data) => {
            setBooks(data);
         } );    
    }
    
    const filterBooks = () => {
        const query = searchQuery.toLowerCase();
        const filteredBooks = books && books.filter(book => {
            const title = book.title.toLowerCase();
            const author = book.author.toLowerCase();

            if (searchMode === 'title') {
                return title.includes(query)
            } else if (searchMode === 'author') {
                return author.includes(query)
            }

            return false;
        });
        setFilteredBooks(filteredBooks);
    };
   

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/bookclubs/'+id+'/bookclub_books', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "book_id": selectedBook.id,
                "month": parseInt(selectedMonth, 10),
                "year": parseInt(year, 10)
            })
        })
        .then((r) => console.log(r))
        window.location.reload();
    }

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value)
    }

    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>What is your next Bookclub Pick?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>Search Books</Modal.Title>
                    <InputGroup>
                        <Form.Control
                        placeholder="Search Books"
                        value={searchQuery}
                        onChange={handleChange}
                        />
                        <Button onClick={handleTitleSearch} variant="outline-secondary">By Title</Button>
                        <Button onClick={handleAuthorSearch} variant="outline-secondary">By Author</Button>
                        <Button onClick={handleClear} variant="outline-secondary">X</Button>
                    </InputGroup>
                    { slider && (
                        <div ref={sliderRef} className=" mt-2 keen-slider">
                            {!selectedBook && filteredBooks && filteredBooks.map((book) => (
                                <div key={book.id} className="keen-slider__slide">
                                    <Button
                                    style={{
                                        border: 'none',
                                        background: 'none',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        padding: 0
                                      }} 
                                    onClick={() => setSelectedBook(book)}>
                                    <Image style={{width: 90, height: 150, 'objectFit': 'cover'}} src={book.image_url}/>
                                    </Button>
                                </div>
                            ))  
                            }
                            <i onClick={(e) => e.stopPropagation() || slider?.current?.prev()} className="bi arrow arrow--left bi-caret-left-fill" style={{color: "#FFFFFF"}}></i>
                            <i onClick={(e) => e.stopPropagation() || slider?.current?.next()} className="bi arrow arrow--right bi-caret-right-fill" style={{color: "#FFFFFF"}}></i> 
                        </div>
                    )}
                    { selectedBook ? 
                    <InputGroup className="mt-2">
                        <InputGroup.Text>Selected Book: {selectedBook.title} </InputGroup.Text>
                        <Button variant="outline-secondary" onClick={() => setSelectedBook('')}>Remove</Button>
                    </InputGroup>
                    : null}
                    <Form.Group className="mt-2">
                        <Form.Label>Select Month & Year</Form.Label>
                        <Form.Select onChange={handleMonthChange} value={selectedMonth}>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </Form.Select> 
                        <Form.Control className="mt-2" style={{width: 100}} type="text" placeholder="Enter year" onChange={(e) => setYear(e.target.value)}/>
                    </Form.Group>
                    <Button className="mt-2" onClick={handleSubmit}>Submit New Book</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddMonthlyBookForm;
  
  