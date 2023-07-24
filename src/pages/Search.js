import { React, useState } from 'react';
import banner from '../images/search-banner.jpg';
import { Container, Image } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import NavbarMain from '../components/NavbarMain';

function Search() {

    return (
        <>
            <Container className="text-center">
                <Container className= "p-5">
                    <Image className="mr-auto" src={banner} style={{width: 600}}/>
                </Container>
             <SearchBar/>
            </Container>
        </>
    )
}

export default Search;