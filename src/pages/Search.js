import { React, useState } from 'react';
import banner from '../images/search-banner.jpg';
import { Container, Image } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';

function Search() {

    return (
        <>
            <Container className="text-center container-height ">
                <Container className= "p-5">
                    <Image className="mr-auto" src={banner} style={{width: 600}}/>
                </Container>
             <SearchBar/>
             <Container className="mt-5">
                <h3>Search Results...</h3>
             </Container>
            </Container>
        </>
    )
}

export default Search;