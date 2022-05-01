import React from 'react';
import Styled from 'styled-components';

import {
  CreateProduct,
  EditProduct
} from './forms';

import {
  Row
} from 'react-bootstrap';

const StyledImage = Styled.img`
  max-width: 800px;
`

const ProductInfo = Styled.div`
  max-width: 800px;
`

export const ProductCreateModal = () => {
  return (
    <CreateProduct />
  )
}

export const ProductEditModal = ({product}) => {
  return (
    <EditProduct product={product}/>
  )
}

export const ProductSeeModal = ({product}) => {
  return (
    <Row className="m-0 gap-4 flex-column">
      <StyledImage src="http://localhost:3001/storage/images/header-background.jpg" className="img-thumbnail" alt={product.title + " image"}/>
      <ProductInfo>
        <h2 className="mb-1">{product.title}</h2>
        <span className="fw-bold">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}</span>
        <p className="mt-3">{product.description}</p>
      </ProductInfo>
    </Row>
  )
}