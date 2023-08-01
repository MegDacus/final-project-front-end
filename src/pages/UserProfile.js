import {React, useState, useContext, useEffect} from 'react';
import UserContext from '../components/UserContext';
import {Container, Form, InputGroup, Button, Card, Row, Image} from 'react-bootstrap';
import placeholder from '../images/club-cover-photo.png'
import CreatableSelect from 'react-select/creatable';

function UserProfile() {
    const {user} = useContext(UserContext);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        if (user){
            getProfileImage()
        }
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            const base64String = reader.result;
            setUploadedImage(base64String?.toString());
          };
        }
      };

    const saveImage = async (e) => {
        await fetch('http://localhost:3000/save_image', {
        method: 'post', 
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify( {
            base64_string: uploadedImage
        })
    })
    .then((resp) => {
        console.log(resp)
        getProfileImage();
    })
    .catch((error) => {
        console.error('Error saving image:', error);
    })
    };

    const getProfileImage = async () => {
        await fetch('http://localhost:3000/get_image/'+user.id)
        .then((data) => data.json())
        .then(resp => {
            const base64_string = ('data:image/png;base64,'+resp.image_data)
            setProfilePic(base64_string)
        })
        .catch((error) => {
            console.error('Error loading image:', error);
        })
    }

    const genreOptions = [
        { value: 'Fantasy', label: 'Fantasy'},
        { value: 'Science Fiction', label: 'Science Fiction'},
        { value: 'Romance', label: 'Romance'},
        { value: 'Horror', label: 'Horror'},
        { value: 'Non-Fiction', label: 'Non-Fiction'},
        { value: 'Contemporary Lit', label: 'Contemporary Lit'},
        { value: 'Young Adult', label: 'Young Adult'},
        { value: 'Children\s Lit', label: 'Children\'s Lit'}
    ]
 
      
    return(
        <Container className="d-flex">
            <Container style={{width: 500}} className="m-5">
                { user && <h1>{user.first_name} {user.last_name}</h1>}
                {user && <Image className="mb-3 mt-3" src={profilePic} style={{height: 200, width: 200 }} roundedCircle/>}
                <Form.Group>
                    <Form.Control type="file" onChange={handleImageChange}/>
                    <Button id="button-addon2" className="mt-3" onClick={saveImage}>{ profilePic ? "Change Profile Pic" : "Add Profile Pic"}</Button>
                </Form.Group>
                <Form.Group className="mt-3 mb-3">
                    <Form.Label>About Me</Form.Label>
                    <Form.Control as="textarea" rows={3}/>
                </Form.Group>
                <Form.Group>
                <Form.Label>Favourite Genres?</Form.Label>
                <CreatableSelect isMulti options={genreOptions}/>
                </Form.Group>
            </Container>
            <Container className="m-5">
                <h2> Memberships:</h2>
                <h4>Hosting:</h4>
                <Row>
                {user && user.memberships.map((membership) => (
                    membership.is_host ? <Card key={membership.id} variant="light" className="m-2" style={{width: '12rem'}}>
                        <Card.Img variant="top" src={placeholder}></Card.Img>
                        <Card.Body>
                        <Card.Subtitle>{membership.bookclub_name}</Card.Subtitle>
                       </Card.Body>
                       <Button href={'/clubs/'+membership.bookclub_id} variant='outline-secondary' className="m-2">View Club</Button>
                    </Card> : null 
                ))}
                </Row>
                <h4>Enjoying:</h4>
                <Row>
                {user && user.memberships.map((membership) => (
                    !membership.is_host ? <Card key={membership.id} variant="light" className="m-2" style={{width: '12rem'}}>
                        <Card.Img variant="top" src={placeholder}></Card.Img>
                        <Card.Body>
                        <Card.Subtitle>{membership.bookclub_name}</Card.Subtitle>
                       </Card.Body>
                       <Button href={'/clubs/'+membership.bookclub_id}variant="outline-secondary" className="m-2">View Club</Button>
                    </Card> : null 
                ))}
                </Row>

            </Container>
        </Container>
    )
}

export default UserProfile;