import { React, useState, useRef } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

function BookForm({showModal, onClose, setBooks}) {
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    summary: "",
    image_url: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const genreOptions = [
    { value: "Fantasy", label: "Fantasy" },
    { value: "Science Fiction", label: "Science Fiction" },
    { value: "Romance", label: "Romance" },
    { value: "Horror", label: "Horror" },
    { value: "Non-Fiction", label: "Non-Fiction" },
    { value: "Contemporary Lit", label: "Contemporary Lit" },
    { value: "Young Adult", label: "Young Adult" },
    { value: "Childrens Lit", label: "Children's Lit" },
];
const handleGenreChange = (selectedValues) => {
  const genres = selectedValues.map((value) => {
    return value.value})

  setFormData({
      ...formData,
      genres: genres.join(', '),
  })}


  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((r) => {
        if (r.ok) {
            console.log(r)
            setFormData({
                "title": "",
                "author": "",
                "summary": "",
                "image_url": ""
            }) 
            onClose()
            r.json().then((data) => { setBooks((prevBooks) => [...prevBooks, data])})
        } else {
            r.json().then((e) => setErrors(Object.values(e).toString()))
        }})
        
  }

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Book to Library</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="mt-3 mb-5" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="title"
            value={formData.title}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="author"
            value={formData.author}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Summary</Form.Label>
          <Form.Control
            onChange={handleChange}
            as="textarea"
            rows={3}
            name="summary"
            value={formData.summary}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Book Cover Image</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Enter Image URL"
            name="image_url"
            value={formData.image_url}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Add Genres</Form.Label>
          <CreatableSelect
            isClearable
            isMulti
            onChange={handleGenreChange}
            options={genreOptions}
          />
        </Form.Group>

        <Button className="mt-3" type="submit">
          Add Book
        </Button>
        
        {errors ? (
          <Alert className="mt-3" variant="danger">
            {errors}
          </Alert>
        ) : null}
      </Form>
      </Modal.Body>
    </Modal>
  );
}

export default BookForm;
