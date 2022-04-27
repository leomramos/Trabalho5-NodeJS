const PORT = process.env.PORT || 3001;

const express = require('express');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/users');
const destinationsRoutes = require('./routes/destinations');


app.use(cors());

app.use('/users', userRoutes);
app.use('/destinations', destinationsRoutes);

app.get('/teste', (req, res) => {
  res.send({ teste: 'teste' });
})

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
})