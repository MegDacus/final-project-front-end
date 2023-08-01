import React, { useState } from 'react';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';
import { GrSearch } from 'react-icons/gr'

function SearchBar({onSearch}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [check, setCheck] = useState('');

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    }
    
    const handleCheck = (e) => {
        setCheck(e.target.id)
    }
    
    const handleClick = () => {
        onSearch(searchQuery, check);
    }

    return (
        <Container className="text-center">
            <InputGroup>
                <Form.Control
                    onChange={handleInputChange}
                    placeholder="Search by club name, book title, or genre"/>
                <Button onClick={handleClick} variant="outline-secondary">
                    <GrSearch/>
                </Button>
            </InputGroup>
            <Form className="mt-2">
                <Form.Check id="club" onClick={handleCheck} inline="true" label="By Club Name" name="options" type="radio"/>
                <Form.Check id="book" onClick={handleCheck} inline="true" label="By Book" name="options" type="radio"/>
                <Form.Check id="author" onClick={handleCheck} inline="true" label="By Author" name="options" type="radio"/>
                <Form.Check id="genre" onClick={handleCheck} inline="true" label="By Genre" name="options" type="radio"/>
            </Form>
        </Container>
    )
}

export default SearchBar;