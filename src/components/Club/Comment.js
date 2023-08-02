import {Card, Container, CloseButton} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';


function Comment({comment, deleteComment}) {
    const [userImage, setUserImage] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (!userImage) {
            getProfilePic()
        }
    }, [])

    function handleDelete() {
        deleteComment(comment.id)
    }

    function getProfilePic() {
        fetch('http://localhost:3000/get_image/'+comment.user.id)
        .then((resp) => resp.json())
        .then((image) => {
            const base64_string = ('data:image/png;base64,'+image.image_data)
            setUserImage(base64_string)
        })
    }
    

    return(
        <Container style={{"borderRadius": "10px", "boxShadow": "0 0 10px rgba(0, 0, 0, 0.2)"}} key={comment.id} className="m-1 d-flex flex-start p-3">
            <Card.Img
            className="rounded-circle shadow-1-strong me-3"
            src={userImage}
            alt="avatar"
            style={{ width: 50, height: 50 }}
            />

            <Container className="flex-grow-1 flex-shrink-1">
                <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1">
                    {comment.user.username}{" "}
                    <span className="small">{comment.created_ago}</span>
                    </p>
                </div>
                <p className="small mb-0">
                    {comment.body}
                </p>
                </Container>
            </Container>
            { user.id === comment.user.id ? <CloseButton onClick={handleDelete} style={{top: "-3px", right: "-455px"}}/> : null }
        </Container>
    )
}

export default Comment;