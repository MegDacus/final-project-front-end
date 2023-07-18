import { React, useState } from 'react';
import NavigationBar from '../components/NavigationBar'
import banner from '../images/search-banner.jpg';
import { Container, Image } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';

function Search() {

    return (
        <>
            <NavigationBar/>
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