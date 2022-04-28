const PORT = process.env.PORT || 3001;

const express = require('express');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/users');
const instrumentsRoutes = require('./routes/instruments');


app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/instruments', instrumentsRoutes);

app.get('/teste', (req, res) => {
  res.send({ teste: 'teste' });
})

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
})