require('dotenv').config();
require('./database');

const PORT = process.env.PORT || 3333;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/storage', express.static('storage'));

app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);

app.get('/teste', (req, res) => {
  res.send({ teste: 'teste' });
})

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
})