import React, { useState } from 'react';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';
import { GrSearch } from 'react-icons/gr'

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearch = () => {
        console.log('Search: ', searchQuery);
    }

    return (
        <Container>
            <InputGroup>
                <Form.Control
                    onChange={handleInputChange}
                    placeholder="Search..."/>
                <Button onClick={handleSearch} variant="outline-secondary">
                    <GrSearch/>
                </Button>
            </InputGroup>
        </Container>
    )
}

export default SearchBar;