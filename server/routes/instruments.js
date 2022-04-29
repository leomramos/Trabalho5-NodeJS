const express = require('express');
const router = express.Router();

router
  .route('/:id')
  .get((req, res) => {
    res.send({ uID: req.params.id });
  })

router
  .route('/list')
  .get((req, res) => {

  })

router
  .route('/create')
  .post((req, res) => {

  })

router
  .route('/update')
  .put((req, res) => {

  })

router
  .route('/delete')
  .delete((req, res) => {

  })


module.exports = router;