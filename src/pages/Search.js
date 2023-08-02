import { React, useState } from 'react';
import banner from '../images/search-banner.jpg';
import { Container, Image, Card, Row, Col } from 'react-bootstrap';
import SearchBar from '../components/Search/SearchBar';


function Search() {
    const [filteredData, setFilteredData] = useState([]);

    const fetchFilteredData = (searchQuery, filterOption) => {
        if (filterOption === "club" || filterOption === "genre") {
            fetch('http://localhost:3000/bookclubs?search_query='+searchQuery+'&type='+filterOption)
            .then((resp) => resp.json())
            .then((data) => setFilteredData(data))
        }
        else if (filterOption === "book" || filterOption === "author") {
            fetch('http://localhost:3000/books?search_query='+searchQuery+'&type='+filterOption)
            .then((resp) => resp.json())
            .then((data) => setFilteredData(data))
        }
    }


    return (
        <>
            <Container className="container-height m-5 text-center">
                <Container className= "p-5">
                    <Image className="mr-auto" src={banner} style={{width: 600}}/>
                </Container>
             <SearchBar onSearch={fetchFilteredData} />
             <Container className="mt-5">
                    {filteredData.map((item) => (
                        <Card className="p-3 m-3" key={item.id}>
                            <Row>
                                <Col md={4} className="text-center">
                                    {item.image_url && <Card.Img src={item.image_url} style={{ height: 200, width:150, objectFit: "cover"}}/>}
                                </Col>
                                <Col md={8}>
                                    <Card.Title>{item.name ? item.name : item.title}</Card.Title>  
                                    <Card.Text>{item.description ? item.description : item.author}</Card.Text>
                                    { item.summary ? <Card.Text 
                                    small='true'
                                    style={{ height: 100, overflow: 'auto'}}>
                                        {item.summary}</Card.Text> : null}
                                    {item.name ?
                                    <Card.Link
                                    href={"clubs/"+item.id}> View Club Here
                                    </Card.Link> : 
                                    <Card.Link
                                    href={"books/"+item.id}>View Book Here
                                    </Card.Link>}
                                </Col>
                            </Row>
                        </Card>
                    ))}
             </Container>
            </Container>
        </>
    )
}

export default Search;