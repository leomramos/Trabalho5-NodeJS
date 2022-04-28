import React from 'react';

import {
  Col,
  Button,
  Card
} from 'react-bootstrap';

export const ProductCard = ({product, actions}) => {
  return (
    <Col md={4} sm={6} className="p-3">
      <Card>
        <img src="http://localhost:3001/storage/images/header-background.jpg" className="card-img-top" alt={product.title + " image"}/>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}</Card.Text>
          <Button variant="primary" onClick={() => actions.seeModal(product)}>See more</Button>
        </Card.Body>
        <Card.Body className="border-top d-flex gap-2">
          <Button variant="dark" onClick={() => actions.editModal(product)}>Edit</Button>
          <Button variant="danger" onClick={() => actions.delete(product)}>Delete</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}