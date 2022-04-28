import React from 'react';

import {
  Col,
  Button,
  Card
} from 'react-bootstrap';

export const ProductCard = ({product, actions}) => {
  return (
    <Col md={4} sm={6} className="p-3" key={product.index}>
      <Card>
        <img src="header-background.jpg" className="card-img-top" alt={product.title + " image"}/>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}</Card.Text>
          <Button variant="primary" onClick={() => actions.seeModal(product)}>See more</Button>
        </Card.Body>
        <Card.Body className="border-top">
          <a href="/" className="card-link">Card link</a>
          <a href="/" className="card-link">Another link</a>
        </Card.Body>
      </Card>
    </Col>
  )
}