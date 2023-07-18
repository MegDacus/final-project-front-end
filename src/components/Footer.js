import React from 'react';
import '../styles/Home.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Row, Col } from "react-bootstrap"


function Footer() {
  return (
    <footer className="text-center" style={{"background-color": "#CADDFE"}}>
        <div className="container pt-2">
            <Row>
                <Col>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#" className="text-dark">Join a Club</a>
                        </li>
                        <li>
                            <a href="#" className="text-dark">Start a Club</a>
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
        </div>
</footer>
  );
};

export default Footer;