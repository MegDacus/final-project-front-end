import {React, useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import BannerImage from '../images/home-banner.jpg'
import logo from "../images/logo-no-background.png"
import Carousel from "../components/Home/Carousel"
import '../styles/Home.css'
import FeaturedCards from '../components/Home/FeaturedCards'
import Footer from '../components/Footer'
import UserContext from '../components/UserContext';

function Home() {
    const user = useContext(UserContext)

    return (
        <>  
            <Container id="home-banner" className= "d-flex p-5 align-items-center">
                <Container>
                    <img src={BannerImage} alt="people reading" className="home-img mr-auto"/>
                </Container>
                <Container className= "ml-auto text-center">
                    <img src={logo} width="300px" height="50px" alt="logo" className="mx-auto d-block"/>
                    <br/>
                    <p className="ml-5 mr-5">Welcome to Curiouser, a captivating destination for book lovers and avid readers! Immerse yourself in thought-provoking discussions, discover new perspectives, and forge connections with fellow bibliophiles who share your passion for the written word. </p>
                    <Button href="/new-club" variant="outline-secondary" size="sm">Start your own club</Button>
                </Container>
            </Container>
            <FeaturedCards/>
            <div className="p-5 popular-books">
                <h3 className="text-center">Popular Books</h3>
                <Carousel/>
            </div>
            <div className="pt-3 pr-3 moving-text-container">
                   <p className="moving-text"> "I am not afraid of storms, for I am learning how to sail my ship." -"Little Women" by Louisa May Alcott   |   "They say nothing lasts forever but they're just scared it will last longer than they can love it." - "On Earth We're Briefly Gorgeous" by Ocean Vuong </p>
            </div>
            <Footer/>
        </>
    )
}

export default Home;