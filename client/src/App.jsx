import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Header, Products, Footer } from './components/layout';
import Modal from 'react-modal';
import Styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import {
  useQuery
} from 'react-query';

Modal.setAppElement('#root');

const StyledModalHeader = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    cursor: pointer;
    padding: 5px;
    font-size: 25px;
    transition: 0.4s;

    &:hover {
      color: black;
    }
  }
`

const ModalHeader = ({title, close}) => {
  return (
    <StyledModalHeader>
      <h4 className="m-0">{title}</h4>
      <FontAwesomeIcon icon={faTimes} onClick={close}/>
    </StyledModalHeader>
  )
}

const checkLogin = async _ => await Axios.post(`${process.env.REACT_APP_SERVER}/api/users/check`);

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState("");
  const [modalContent, setModalContent] = useState(<></>);
  
  const [user, setUser] = useState();

  const login = useQuery('user', checkLogin);

  console.log(login);

  // useEffect(() => {
  //   setUser(login);
  // }, [login])

  const modal = {
    open: () => setModalOpen(true),
    close: () => setModalOpen(false),
    setLabel: label => setModalLabel(label),
    setContent: content => setModalContent(content)
  }

  return (
    <div className="App">
      <Modal
        isOpen={isModalOpen}
        contentLabel={modalLabel}
        onRequestClose={modal.close}
        preventScroll={true}
      >
        <ModalHeader title={modalLabel} close={modal.close}/>
        {modalContent}
      </Modal>
      <Header modal={modal} user={user} setUser={setUser}/>
      <Products modal={modal} loggedIn={!!user}/>
      <Footer />
    </div>
  );
}

export default App;