import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

function EditBookModal({ book, show, setShow }) {
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
      return value.value;
    });

    setFormData({
      ...formData,
      genres: genres.join(", "),
    });
  };

  function handleClick() {
    console.log(formData);
    const updatedData = Object.fromEntries(Object.entries(formData).filter(([key, value]) => value !== ''));
    
    fetch("http://localhost:3000/books/" + book.id, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((resp) => resp.json())
      window.location.reload();
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {book.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Update Title</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="title"
            value={formData.title}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Update Author</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="author"
            value={formData.author}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Update Summary</Form.Label>
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
        <Button onClick={handleClick} className="mt-2" variant="secondary">
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default EditBookModal;
