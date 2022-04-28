import React from 'react';

import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

export const Footer = () => {
  return (
    <Container fluid className="bg-dark text-light py-5">
      <Container>
        <Row>
          <Col md={6}>
            <p className="m-0">
              Trabalho 5 - NodeJS (Express + React.JS)
            </p>
            <p>
              Rio Grande do Sul, BR
            </p>
            <p className="text-muted" style={{fontSize: "0.8em"}}>
              &copy; Copyright 2022. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-end">
            <a href="/" className="text-light text-decoration-none m-2">Home</a>
            <a href="#products" className="text-light text-decoration-none">Products</a>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}