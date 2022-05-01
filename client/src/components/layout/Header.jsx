import React from 'react';
import Styled, { keyframes } from 'styled-components';
import Axios from 'axios';
import Swal from 'sweetalert2';

import {
  Container,
  Row,
  Col,
  Button,
  Tooltip,
  OverlayTrigger
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
    align-items: center;
    svg {
      font-size: 2em;
      margin-right: 10px;
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

export const Header = ({modal, user, setUser}) => {
  const handleSignUpModal = () => {
    modal.setLabel('Sign Up');
    modal.setContent(<SignUpForm setUser={setUser} closeModal={modal.close}/>);
    modal.open();
  }

  const handleLoginModal = () => {
    modal.setLabel('Login');
    modal.setContent(<LoginForm setUser={setUser} closeModal={modal.close}/>);
    modal.open();
  }

  const handleLogout = () => {
    setUser();
    Axios.post(`${process.env.REACT_APP_SERVER}/api/users/logout`);
    Swal.fire({
      backdrop: false,
      timer: 2500,
      timerProgressBar: true,
      title: 'Logged out',
      text: 'You have successfully been logged out!',
      icon: 'success',
      confirmButtonColor: '#17a2b8'
    });
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
                {!!user ? (
                  <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => (
                      <Tooltip {...props}>
                        Logged in as {user}
                      </Tooltip>
                    )}
                    placement="bottom"
                  >
                  <li>
                      <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
                  </li>
                </OverlayTrigger>
                ) : (
                  <>
                    <li><Button variant="outline-primary" onClick={handleSignUpModal}>Sign up</Button></li>
                    <li><Button variant="dark" onClick={handleLoginModal}>Login</Button></li>
                  </>
                )}
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
          <a href="#products" className="text-center d-flex m-auto"><ClickToScroll icon={faChevronDown} className="text-primary"/></a>
        </Container>
      </div>
    </StyledHeader>
  )
}