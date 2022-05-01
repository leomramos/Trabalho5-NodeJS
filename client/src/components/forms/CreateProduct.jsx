import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2'
import SimpleReactValidator from 'simple-react-validator';
import {
  Form,
  Button
} from 'react-bootstrap';

import Axios from 'axios';

import {
  useMutation,
  useQueryClient
} from 'react-query';

const createProduct = async ( data ) => await Axios.post(`${process.env.REACT_APP_SERVER}/api/products/create`, data, { headers: { 'Content-Type': 'multipart/form-data'}}).then(res => console.log(res));

export const CreateProduct = () => {
  const [rerender, setRerender] = useState(false);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();
  console.log(image);

  const validator = useRef(new SimpleReactValidator());
  const form = useRef();

  const queryClient = useQueryClient();

  const createProductMutation = useMutation(createProduct, {
    onSuccess: (_, product) => {
      queryClient.invalidateQueries('products');
      Swal.fire({
        backdrop: false,
        timer: 2500,
        timerProgressBar: true,
        title: 'Created',
        html: `<strong>${product.title}</strong> has been created!`,
        icon: 'success',
        confirmButtonColor: '#17a2b8'
      });
    }
  })

  const submitForm = e => {
    if (validator.current.allValid()) {
      // console.log(form)
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);
      // Axios.postForm("https://httpbin.org/anything", formData, {
      //   headers: { "Content-Type": "multipart/form-data" }
      // }).then(res => console.log(res))
      validator.current.hideMessages();
      createProductMutation.mutate(formData);
      alert('You submitted the form and stuff!');
    } else {
      validator.current.showMessages();
      setRerender(!rerender);
    }
  }

  return (
    <Form className="d-flex flex-column" ref={form}>
      <h5 className="fw-normal mb-3 pb-3">Add a new instrument</h5>

      <Form.Floating className="mb-4">
        <Form.Control type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"/>
        <Form.Label htmlFor="title">Title</Form.Label>
        {validator.current.message('title', title, 'required|max:50') || validator.current.messageWhenPresent(title)}
      </Form.Floating>
      
      <Form.Floating className="mb-4">
        <Form.Control type="number" id="price" step={0.1} value={price} onChange={e => setPrice(e.target.value)} placeholder="Price"/>
        <Form.Label htmlFor="price">Price</Form.Label>
        {validator.current.message('price', price, 'required|min:1|max:1000000000|currency') || validator.current.messageWhenPresent(price)}
      </Form.Floating>

      <Form.Floating className="mb-4">
        <Form.Control as="textarea" maxLength={255} id="description" style={{resize: "vertical", minHeight: "100px", maxHeight: "200px"}} value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"/>
        <Form.Label htmlFor="description">Description</Form.Label>
        {validator.current.message('description', description, 'required|min:10|max:255') || validator.current.messageWhenPresent(description)}
      </Form.Floating>


      <Form.Group className="mb-4">
        <Form.Control type="file" id="image" accept="image/*" onChange={e => setImage(e.target.files[0])} placeholder="Image"/>
        {image && (
          <img className="img-thumbnail mt-3" style={{maxWidth: "320px"}} src={URL.createObjectURL(image)} alt="Upload"/>
        )}
        {validator.current.message('image', image, 'required') || validator.current.messageWhenPresent('a')}
      </Form.Group>
      
      <Button variant="dark" className="w-100 mb-3 mt-1" disabled={createProductMutation.isLoading} onClick={submitForm}>Create</Button>
    </Form>
  )
}