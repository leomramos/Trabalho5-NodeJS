import React from 'react';
import Styled from 'styled-components';

import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

const StyledFooter = Styled(Container)`
  /* background-color: #212529; */
`

export const Footer = () => {
  return (
    <StyledFooter fluid className="bg-dark text-light p-5">
      <Container>
        <Row>
          <Col className="md-6">
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
          <Col className="md-6 text-end">
            <a href="/" className="text-light text-decoration-none m-2">Home</a>
            <a href="#products" className="text-light text-decoration-none">Products</a>
          </Col>
        </Row>
      </Container>
    </StyledFooter>
  )
}