import {React, useState, useContext, useEffect} from 'react';
import UserContext from '../components/UserContext';
import {Container, Form, InputGroup, Button, Card, Row, Image} from 'react-bootstrap';
import placeholder from '../images/club-cover-photo.png'
import CreatableSelect from 'react-select/creatable';
import UsersTable from '../components/UserDashboard/UsersTable';
import AdminSignupModal from '../components/UserDashboard/AdminSignupModal';
import Footer from '../components/Footer';

function UserDashboard() {
    const user = useContext(UserContext);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [showUsers, setShowUsers] = useState(false);
    const [showAdminForm, setShowAdminForm] = useState(false);
    const [chooseFile, showChooseFile] = useState(false);

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
        showChooseFile(false);
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
        console.log(user.bookclubs)
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

    const toggleForm = (e) => {
        if (e.target.id === "adminButton") {setShowAdminForm(!showAdminForm)}
        else {setShowUsers(!showUsers)};
    }

    const handleClose = () => {
        setShowUsers(false);
        setShowAdminForm(false);
    }
 
      
    return(
        <>
        <Container className="d-flex" style={{height: '88vh'}}>
            <Container style={{width: 500}} className="m-5">
                { user && <h1>{user.first_name} {user.last_name}</h1>}
                {user && <Image className="mb-3 mt-3" src={profilePic} style={{height: 200, width: 200 }} roundedCircle/>}
                <Form.Group>
                    { !chooseFile ? 
                    <Button variant="secondary" className="mt-3" onClick={() => showChooseFile(true)}>{ profilePic ? "Change Profile Pic" : "Add Profile Pic"}</Button> 
                    : (
                    <>
                    <Form.Control type="file" onChange={handleImageChange}/>
                    <Button variant="secondary" className="mt-3" onClick={saveImage}>Save</Button> </> )}
                </Form.Group>
                <Button className="mt-2" variant="secondary" href="/new-club">Start New Club</Button>
                { user && user.is_admin ? 
                <>
                <Button onClick={toggleForm} id="adminButton" className="mt-2" variant="secondary" >Create new Admin User</Button>
                <Button onClick={toggleForm} id="usersButton" className="mt-2"  variant="secondary" href="#">Access Users</Button>
                </> : null}
            </Container>
            <Container className="m-5">
                <h2> Memberships:</h2>
                <h4>Hosting:</h4>
                <Row>
                {user && user.bookclubs.map((bookclub) => (
                    bookclub.host.id === user.id ? <Card key={bookclub.id} variant="light" className="m-2" style={{width: '12rem'}}>
                        <Card.Img className="mt-2" variant="top" src={bookclub.image_url}></Card.Img>
                        <Card.Body>
                        <Card.Subtitle>{bookclub.name}</Card.Subtitle>
                       </Card.Body>
                       <Button href={'/clubs/'+bookclub.id} variant='outline-secondary' className="m-2">View Club</Button>
                    </Card> : null 
                ))}
                </Row>
                <h4>Enjoying:</h4>
                <Row>
                {user && user.bookclubs.map((bookclub) => (
                    bookclub.host.id !== user.id ? <Card key={bookclub.id} variant="light" className="m-2" style={{width: '12rem'}}>
                        <Card.Img className="mt-2" variant="top" src={bookclub.image_url}></Card.Img>
                        <Card.Body>
                        <Card.Subtitle>{bookclub.name}</Card.Subtitle>
                       </Card.Body>
                       <Button href={'/clubs/'+bookclub.id}variant="outline-secondary" className="m-2">View Club</Button>
                    </Card> : null 
                ))}
                </Row>
                { user?.is_admin ? (
                <>
                <UsersTable show={showUsers} handleClose={handleClose}/>
                <AdminSignupModal show={showAdminForm} handleClose={handleClose}/> 
                </>
                ) : null }
            </Container>
        </Container>
        <Footer/>
        </>
    )
}

export default UserDashboard;