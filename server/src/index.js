require('dotenv').config();
require('./database');

const PORT = process.env.PORT || 3333;

const express = require('express');
const app = express();
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require("cookie-parser");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 30 },
  saveUninitialized: true
}));

app.use(fileUpload({
  createParentPath: true
}));

app.use(cookieParser());

const userRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/storage', express.static('storage'));

app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);

app.get('/teste', (req, res) => {
  res.send({ teste: 'teste' });
})

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
})