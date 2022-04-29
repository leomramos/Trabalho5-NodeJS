import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {
  Form,
  Button
} from 'react-bootstrap';

export const CreateProduct = () => {
  const [rerender, setRerender] = useState(false);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();

  const validator = useRef(new SimpleReactValidator());

  const submitForm = () => {
    if (validator.current.allValid()) {
      validator.current.hideMessages();
      alert('You submitted the form and stuff!');
    } else {
      validator.current.showMessages();
      setRerender(!rerender);
    }
  }

  return (
    <Form className="d-flex flex-column">
      <h5 className="fw-normal mb-3 pb-3">Add a new instrument</h5>

      <Form.Floating className="mb-4">
        <Form.Control type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"/>
        <Form.Label htmlFor="title">Title</Form.Label>
        {validator.current.message('title', title, 'required|max:50')}
        {validator.current.messageWhenPresent(title)}
      </Form.Floating>
      
      <Form.Floating className="mb-4">
        <Form.Control type="number" id="price" step={0.1} value={price} onChange={e => setPrice(e.target.value)} placeholder="Price"/>
        <Form.Label htmlFor="price">Price</Form.Label>
        {validator.current.message('price', price, 'required|min:1|max:1000000000|currency')}
        {validator.current.messageWhenPresent(price)}
      </Form.Floating>

      <Form.Floating className="mb-4">
        <Form.Control as="textarea" maxLength={255} id="description" style={{resize: "vertical", minHeight: "100px", maxHeight: "200px"}} value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"/>
        <Form.Label htmlFor="description">Description</Form.Label>
        {validator.current.message('description', description, 'required|min:10|max:255')}
        {validator.current.messageWhenPresent(description)}
      </Form.Floating>


      <Form.Group className="mb-4">
        <Form.Control type="file" id="image" accept="image/*" onChange={e => setImage(e.target.files[0])} placeholder="Image"/>
        {image && (
          <img className="img-thumbnail mt-3" style={{maxWidth: "320px"}} src={URL.createObjectURL(image)} alt="Upload"/>
        )}
        {validator.current.message('image', image, 'required')}
        {validator.current.messageWhenPresent('a')}
      </Form.Group>
      
      <Button variant="dark" className="w-100 mb-3 mt-1" onClick={submitForm}>Create</Button>
    </Form>
  )
}