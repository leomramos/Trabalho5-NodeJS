const express = require('express');
const router = express.Router();

router
  .route('/register')
  .post((req, res) => {

  })

router
  .route('/login')
  .post((req, res) => {
    res.send("teste");
  })

module.exports = router;