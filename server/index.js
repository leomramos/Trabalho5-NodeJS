const PORT = 3001;

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.listen(PORT, () => {
  console.log('Started Server');
})