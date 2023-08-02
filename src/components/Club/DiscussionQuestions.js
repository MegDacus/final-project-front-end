import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import Comments from './Comments';

function DiscussionQuestions({questions, id}) {

    return(
        <Container>
            {questions && questions.map((question) => (
                <Container key={question.id}>
                <h6 className="mt-3">{question.body}</h6>
                <Comments question={question} clubId={id}/>
                </Container>
            ))}
        </Container>
    )
}

export default DiscussionQuestions;