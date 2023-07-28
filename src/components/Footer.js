import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Container, Row, Col } from "react-bootstrap"


function Footer() {
  return (
    <footer style={{bottom: 0}} className="d-flex footer text-center">
        <Container style={{bottom: 0, position: "sticky" }} className="pt-2">
            <Row>
                <Col>
                    <ul className="list-unstyled">
                        <li>
                            <a href="/clubs" className="text-dark">Join a Club</a>
                        </li>
                        <li>
                            <a href="/new-club" className="text-dark">Start a Club</a>
                        </li>
                    </ul> 
                </Col>
                <Col>
                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        ><FaFacebookF/>
                    </a>
                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        ><FaTwitter/>
                    </a>
                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        ><FaInstagram/>
                    </a>
                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        ><FaLinkedinIn/>
                    </a>
                </Col>
                <Col>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#" className="text-dark">About Us</a>
                        </li>
                        <li>
                            <a href="#" className="text-dark">FAQs</a>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
</footer>
  );
};

export default Footer;