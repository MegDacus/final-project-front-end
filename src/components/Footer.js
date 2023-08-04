import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Container, Row, Col } from "react-bootstrap"


function Footer() {
  return (
    <footer style={{bottom: 0, width: "100%"}} className="d-flex footer text-center">
        <Container className="pt-2">
            <Row className="align-items-center">
                <Col>
                            <a href="/clubs" className="text-dark">Join a Club</a>
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
                            <a href="/new-club" className="text-dark">Start a Club</a>
                </Col>
            </Row>
        </Container>
</footer>
  );
};

export default Footer;