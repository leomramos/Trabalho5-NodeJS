import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {

  const getResponse = async () => {
    axios.get('/teste')
      .then(response => console.log(response))
      .catch(e => console.log(e))
  };

  useEffect(() => {
    getResponse();
  }, [])

  return (
    <div className="App">
    </div>
  );
}

export default App;
