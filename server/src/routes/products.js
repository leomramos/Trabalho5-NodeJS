const express = require('express');
const router = express.Router();
const Controller = require('../controllers/ProductController');

router
  .route('/all')
  .get((req, res) => {
    Controller.index().then(result => res.json(result));
  })

router
  .route('/create')
  .post((req, res) => {
    console.log(req);
    // Controller.store(req.body)
  })

router
  .route('/update')
  .put((req, res) => {

  })

router
  .route('/delete')
  .delete((req, res) => {
    Controller.destroy(req.body.id).then(res.send('Product deleted.'));
  })

module.exports = router;
// .catch(err => res.status(400).send(err))