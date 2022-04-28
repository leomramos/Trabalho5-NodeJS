import React from 'react';
import Styled, { keyframes } from 'styled-components';

import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap';

import { LoginForm, SignUpForm } from '../forms';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGuitar, faChevronDown } from '@fortawesome/free-solid-svg-icons'


const Nav = Styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
  color: #b8b8b8;
  transition: 0.4s ease-in-out;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: whitesmoke;
    }
  }

  #nav-brand {
    display: flex;
    align-items: flex-end;
    svg {
      font-size: 3em;
    }
    #brand-name {
      font-size: 1.5em;
    }
  }

  #navbar-links {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    gap: 15px;
    list-style: none;
  }
`

const CTA = Styled(Col)`
  color: #b8b8b8;
  h1 {
    font-size: 3.5em;
    font-weight: bold;
    color: whitesmoke;
  }

  p {
    color: inherit;
  }

  a {
    font-size: 1.5em;
  }
`

const clickHere = keyframes`
  to {
    transform: translateY(-10px) scale(1.2);
  }
`

const ClickToScroll = Styled(FontAwesomeIcon)`
  padding: 25px;
  font-size: 1.5em;
  animation: ${clickHere} 0.8s alternate infinite ease-in-out;
  transform-origin: center;
`

const StyledHeader = Styled(Container)`
  background: no-repeat center/cover url('header-background.jpg');
  height: 100%;
  width: 100%;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = ({modal}) => {
  const handleSignUpModal = () => {
    modal.setLabel('Sign Up');
    modal.setContent(<SignUpForm />);
    modal.open();
  }

  const handleLoginModal = () => {
    modal.setLabel('Login');
    modal.setContent(<LoginForm />);
    modal.open();
  }

  return (
    <StyledHeader fluid>
      <div className="black-overlay">
        <Container className="d-flex flex-grow-1 flex-column">
          <Row>
            <Nav>
              <a id="nav-brand" href="/">
                <FontAwesomeIcon icon={faGuitar} />
                <span id="brand-name">The Sound of Your Song</span>
              </a>
              <ul id="navbar-links">
                <li><a href="/">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><Button variant="outline-primary" onClick={handleSignUpModal}>Sign up</Button></li>
                <li><Button variant="dark" onClick={handleLoginModal}>Login</Button></li>
              </ul>
            </Nav>
          </Row>
          <Row className="flex-grow-1 justify-content-center align-items-center text-light">
            <CTA md={6}>
              <h1>Looking for an instrument?</h1>
              <p>We have the best options for you to choose from.</p>
              <Button variant="outline-primary" href="#products" className="mt-3">Check it out</Button>
            </CTA>
          </Row>
          <a href="#products" className="text-center"><ClickToScroll icon={faChevronDown} className="text-primary"/></a>
        </Container>
      </div>
    </StyledHeader>
  )
}