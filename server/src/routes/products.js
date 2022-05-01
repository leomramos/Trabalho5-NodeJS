const express = require('express');
const router = express.Router();
const Controller = require('../controllers/ProductController');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

router
  .route('/all')
  .get((req, res) => {
    Controller.index().then(result => res.json(result));
  })

router
  .route('/create')
  .post((req, res) => {
    const product = req.body;
    Controller.checkTitle(product.title).then(result => {
      if (!result) {
        product.image = crypto.createHash('md5').update(Date.now().toString()).digest('hex') + '.' + req.files.image.mimetype.split('/')[1];
        req.files.image.mv(path.resolve(__dirname, '..', '..', 'storage', 'images', product.image));
        Controller.store(product, res).then(result => res.send(result));
        return;
      } else {
        res.status(400).send({ error: 'A product with this title already exists.' });
        return;
      }
    });
  })

router
  .route('/update')
  .put((req, res) => {
    const product = req.body;
    Controller.checkTitle(product.title, product.id).then(result => {
      if (!result) {
        Controller.find(product.id).then(oldProduct => {
          if (req.files) {
            fs.unlink(path.resolve(__dirname, '..', '..', 'storage', 'images', oldProduct.dataValues.image), _ => { });
            product.image = crypto.createHash('md5').update(Date.now().toString()).digest('hex') + '.' + req.files.image.mimetype.split('/')[1];
            req.files.image.mv(path.resolve(__dirname, '..', '..', 'storage', 'images', product.image));
          } else {
            product.image = oldProduct.image;
          }
          Controller.update(product).then(result => res.send(result));
          return;
        })
      } else {
        res.status(400).send({ error: 'A product with this title already exists.' });
        return;
      }
    });
  })

router
  .route('/delete')
  .delete((req, res) => {
    fs.unlink(path.resolve(__dirname, '..', '..', 'storage', 'images', req.body.product.image), _ => { });
    Controller.destroy(req.body.product.id).then(res.status(200).send('Product deleted.'));
  })

module.exports = router;