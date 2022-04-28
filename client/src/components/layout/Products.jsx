import React, { useState } from 'react';

import {
  Container,
  Row
} from 'react-bootstrap';

import { ProductCard, ProductCreateModal, ProductEditModal, ProductSeeModal } from '../';

export const Products = ({modal}) => {
  const [products, setProducts] = useState([
    {
      index: 0,
      title: 'Teste 1',
      description: 'Descrição 1',
      price: 100000
    }
  ]);

  const actions = {
    createModal: product => {
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
    }
  }

  return (
    <Container id="products" className="py-5">
      <Row className="mb-5">
        <h1>
          Products
        </h1>
        <span>
          { products.length > 0 ?
            "Your next instrument is here waiting for you" :
            "We are sorry, but we are out of stock"
          }
        </span>
      </Row>
      <Row>
        {
          products.map((product, index) => <ProductCard key={index} product={product} actions={actions} />)
        }
      </Row>
    </Container>
  )
}