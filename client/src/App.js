import React, { useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const getResponse = async () => {
    axios.get('/teste')
      .then(response => {
        console.log(response);
        alert(response.data.teste);
      })
      .catch(e => console.error(e))
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
