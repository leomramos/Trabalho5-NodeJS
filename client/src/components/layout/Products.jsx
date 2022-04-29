import React, { useState } from 'react';
import Swal from 'sweetalert2'

import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import { ProductCard, ProductCreateModal, ProductEditModal, ProductSeeModal } from '../';

export const Products = ({modal}) => {
  const [products, setProducts] = useState([
    {
      id: 0,
      title: 'Teste 1',
      description: 'Descrição 1',
      price: 100000,
      img: `${process.env.REACT_APP_SERVER}/storage/images/header-background.jpg`
    },
    {
      id: 1,
      title: 'Teste 2',
      description: 'Descrição 2',
      price: 200000,
      img: `${process.env.REACT_APP_SERVER}/storage/images/header-background.jpg`
    },
    {
      id: 2,
      title: 'Teste 3',
      description: 'Descrição 3',
      price: 300000,
      img: `${process.env.REACT_APP_SERVER}/storage/images/header-background.jpg`
    },
    {
      id: 3,
      title: 'Teste 4',
      description: 'Descrição 4',
      price: 400000,
      img: `${process.env.REACT_APP_SERVER}/storage/images/header-background.jpg`
    },
    {
      id: 4,
      title: 'Teste 5',
      description: 'Descrição 5',
      price: 500000,
      img: `${process.env.REACT_APP_SERVER}/storage/images/header-background.jpg`
    },
    {
      id: 5,
      title: 'Teste 6',
      description: 'Descrição 6',
      price: 600000,
      img: `${process.env.REACT_APP_SERVER}/storage/images/header-background.jpg`
    },
  ]);

  const actions = {
    createModal: _ => {
      modal.setLabel("Create product");
      modal.setContent(<ProductCreateModal />)
      modal.open();
    },
    editModal: product => {
      modal.setLabel("Edit product");
      modal.setContent(<ProductEditModal product={product} />)
      modal.open();
    },
    seeModal: product => {
      modal.setLabel(product.title);
      modal.setContent(<ProductSeeModal product={product} />)
      modal.open();
    },
    delete: product => {
      Swal.fire({
        backdrop: false,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          setProducts(products.filter(p => p.id !== product.id))
          Swal.fire({
            backdrop: false,
            title: 'Deleted',
            text: `${product.title} has been deleted!`,
            icon: 'success',
            confirmButtonColor: '#17a2b8'
          })
        }
      })    
    }
  }

  return (
    <Container id="products" className="py-5">
      <Row className="mb-5">
        <Col md={6}>
          <h1>
            Products
          </h1>
          <span>
            { products.length > 0 ?
              "Your next instrument is here waiting for you" :
              "We are sorry, but we are out of stock"
            }
          </span>
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <Button variant="primary" className="fw-bold" onClick={actions.createModal}>Add Product <FontAwesomeIcon icon={faPlusCircle} /></Button>
        </Col>
      </Row>
      <Row>
        {
          products.map((product, index) => <ProductCard key={index} product={product} actions={actions} />)
        }
      </Row>
    </Container>
  )
}