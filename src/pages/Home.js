import React from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import BannerImage from '../images/home-banner.jpg'
import logo from "../images/logo-no-background.png"
import Carousel from "../components/Carousel"
import '../styles/Home.css'
import ClubCards from '../components/ClubCards'
import Footer from '../components/Footer'

function Home() {
    return (
        <>
            <NavigationBar/>
            <Container id="home-banner" className= "d-flex p-5 align-items-center">
                <Container>
                    <img src={BannerImage} alt="people reading" className="home-img mr-auto"/>
                </Container>
                <Container className= "ml-auto">
                    <img src={logo} width="300px" height="50px" alt="logo" className="mx-auto d-block"/>
                    <br/>
                    <p className="ml-5 mr-5 text-center">Welcome to Curiouser, a captivating destination for book lovers and avid readers! Immerse yourself in thought-provoking discussions, discover new perspectives, and forge connections with fellow bibliophiles who share your passion for the written word. </p>
                </Container>
            </Container>
            <ClubCards/>
            <div className="p-5 popular-books">
                <h3 className="text-center">Popular Books</h3>
                <Carousel/>
            </div>
            <div className="">
                   <p className="moving-text"> "I am not afraid of storms, for I am learning how to sail my ship." -"Little Women" by Louisa May Alcott </p>
            </div>
            <Footer/>
        </>
    )
}

export default Home;

// | "They say nothing lasts forever but they're just scared it will last longer than they can love it." - "On Earth We're Briefly Gorgeous" by Ocean Vuong | "It is only with the heart that one can see rightly; what is essential is invisible to the eye." - "The Little Prince" by Antoine de Saint-Exupéry