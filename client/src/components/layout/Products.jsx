import React from 'react';
import Swal from 'sweetalert2'
import Axios from 'axios';

import {
  useQuery,
  useMutation,
  useQueryClient
} from 'react-query';

import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import { ProductCard, ProductCreateModal, ProductEditModal, ProductSeeModal } from '../';

let deleted;

const getProducts = async () => await Axios.get(`${process.env.REACT_APP_SERVER}/api/products/all`).then(res => res.data).catch(e => console.error(e));
const deleteProduct = async product => await Axios.delete(`${process.env.REACT_APP_SERVER}/api/products/delete`, { data: { product }}).then(res => {
  deleted = true;
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

export const Products = ({modal, loggedIn}) => {
  const queryClient = useQueryClient();

  const products = useQuery('products', getProducts);
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: (_, product) => {
      if(deleted) {
        products.remove();
        queryClient.invalidateQueries('products');
        Swal.fire({
          backdrop: false,
          timer: 2500,
          timerProgressBar: true,
          title: 'Deleted',
          html: `<strong>${product.title}</strong> has been deleted!`,
          icon: 'success',
          confirmButtonColor: '#17a2b8'
        });
      }
    }
  })

  const actions = {
    createModal: _ => {
      modal.setLabel("Create product");
      modal.setContent(<ProductCreateModal closeModal={modal.close}/>)
      modal.open();
    },
    editModal: product => {
      modal.setLabel("Edit product");
      modal.setContent(<ProductEditModal product={product} closeModal={modal.close}/>)
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
          deleted = false;
          deleteProductMutation.mutate(product);
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
            { products.isSuccess && products.data && products.data.length > 0 ?
              "Your next instrument is here waiting for you" :
              "We are sorry, but we are out of stock"
            }
          </span>
        </Col>
        {loggedIn && (
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <Button variant="primary" className="fw-bold d-flex align-items-center gap-2" onClick={actions.createModal}>Add new<FontAwesomeIcon icon={faPlusCircle}/></Button>
          </Col>
        )}
      </Row>
      <Row>
        {
          products.isSuccess && products.data && products.data.map((product, index) => <ProductCard key={index} product={product} actions={actions} loggedIn={loggedIn} />)
        }
      </Row>
    </Container>
  )
}