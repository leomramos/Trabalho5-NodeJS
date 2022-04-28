import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Footer } from './components/layout';
import Modal from 'react-modal';
import Styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

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

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState("");
  const [modalContent, setModalContent] = useState(<></>);

  const modal = {
    open: () => setModalOpen(true),
    close: () => setModalOpen(false),
    setLabel: label => setModalLabel(label),
    setContent: content => setModalContent(content)
  }

  const getResponse = async () => {
    axios.get('/api/instruments/123213')
      .then(response => {
        console.log(response);
        // alert(response.data.uID);
      })
      .catch(e => console.error(e))
  };

  useEffect(() => {
    getResponse();
  }, [])

  return (
    <div className={`App ${isModalOpen ? 'lock-scroll' : ''}`}>
      <Modal
        isOpen={isModalOpen}
        contentLabel={modalLabel}
        onRequestClose={modal.close}
      >
        <ModalHeader title={modalLabel} close={modal.close}/>
        {modalContent}
      </Modal>
      <Header modal={modal}/>
      <Footer />
      <div id="products">
        asdsad
      </div>
    </div>
  );
}

export default App;