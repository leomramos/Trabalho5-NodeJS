import React from 'react';
import Styled from 'styled-components';

import {
  Row,
  Col,
  Button,
  Card
} from 'react-bootstrap';

const StyledImage = Styled.img`
  max-width: 400px;
`

export const ProductCreateModal = ({product}) => {
  return (
    <p>
      aaaaaaa
    </p>
  )
}

export const ProductEditModal = ({product}) => {
  return (
    <p>
      {JSON.stringify(product)}
    </p>
  )
}

export const ProductSeeModal = ({product}) => {
  return (
    <Row className="m-0">
      <Col md={6}>
        <StyledImage src="http://localhost:3001/storage/images/header-background.jpg" className="img-thumbnail" alt={product.title + " image"}/>
      </Col>
      <p>
        {JSON.stringify(product)}
      </p>
    </Row>
  )
}