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

let edited;

const editProduct = async ( data ) => await Axios.put(`${process.env.REACT_APP_SERVER}/api/products/update`, data, { headers: { 'Content-Type': 'multipart/form-data'}}).then(res => {
  edited = true;
}).catch(err => {
  Swal.fire({
    backdrop: false,
    timer: 2500,
    timerProgressBar: true,
    title: err.response.data.error,
    icon: 'error',
    confirmButtonColor: '#17a2b8'
  });
});

export const EditProduct = ({product, closeModal}) => {
  const [rerender, setRerender] = useState(false);

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState();

  const validator = useRef(new SimpleReactValidator());

  const queryClient = useQueryClient();

  const editProductMutation = useMutation(editProduct, {
    onSuccess: _ => {
      if(edited) {
        queryClient.invalidateQueries('products');
        closeModal();
        Swal.fire({
          backdrop: false,
          timer: 2500,
          timerProgressBar: true,
          title: 'Edited',
          html: `<strong>${product.title !== title ? `<s>${product.title}</s>` : ''} ${title}</strong> has been edited!`,
          icon: 'success',
          confirmButtonColor: '#17a2b8'
        });
      }
    }
  })

  const submitForm = e => {
    if (validator.current.allValid()) {
      const formData = new FormData();
      formData.append("id", product.id);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);
      validator.current.hideMessages();
      edited = false;
      editProductMutation.mutate(formData);
    } else {
      validator.current.showMessages();
      setRerender(!rerender);
    }
  }

  return (
    <Form className="d-flex flex-column">
      <h5 className="fw-normal mb-3 pb-3">Edit {product.title}</h5>

      <Form.Floating className="mb-4">
        <Form.Control type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"/>
        <Form.Label htmlFor="title">Title</Form.Label>
        {validator.current.message('title', title, 'required|max:50')}
      </Form.Floating>
      
      <Form.Floating className="mb-4">
        <Form.Control type="number" id="price" step={0.1} min={0} max={1000000000} value={price} onChange={e => setPrice(e.target.value)} placeholder="Price"/>
        <Form.Label htmlFor="price">Price</Form.Label>
        {validator.current.message('price', price, 'required|currency')}
      </Form.Floating>

      <Form.Floating className="mb-4">
        <Form.Control as="textarea" maxLength={255} id="description" style={{resize: "vertical", minHeight: "100px", maxHeight: "200px"}} value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"/>
        <Form.Label htmlFor="description">Description</Form.Label>
        {validator.current.message('description', description, 'required|min:10|max:255')}
      </Form.Floating>


      <Form.Group className="mb-4">
        <Form.Control type="file" id="image" accept="image/*" onChange={e => setImage(e.target.files[0])} placeholder="Image"/>
        <img className="img-thumbnail mt-3" style={{maxWidth: "320px"}} src={image ? URL.createObjectURL(image) : `${process.env.REACT_APP_SERVER}/storage/images/${product.image}`} alt="Upload"/>
      </Form.Group>
      
      <Button variant="dark" className="w-100 mb-3 mt-1" onClick={submitForm}>Update</Button>
    </Form>
  )
}