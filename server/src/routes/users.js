const express = require('express');
const router = express.Router();
const Controller = require('../controllers/UserController');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router
  .route('/register')
  .post((req, res) => {
    const user = req.body.user;
    Controller.checkAccount(user.email).then(result => {
      console.log(result);
      if (!result) {
        bcrypt.hash(user.password, saltRounds, (err, hash) => {
          user.password = hash;
          Controller.store(user, res).then(result => res.send(result));
        })
      } else {
        res.status(400).send({ email: 'Email already taken.' });
      }
    });
  })

router
  .route('/login')
  .post((req, res) => {
    const user = req.body.user;
    Controller.checkAccount(user.email).then(result => {
      if (!result) {
        res.status(400).send({ email: 'Email not found.' });
      } else {
        bcrypt.compare(user.password, result.dataValues.password, (err, equal) => {
          if (!equal) {
            res.status(400).send({ password: 'Incorrect password.' });
          }
          res.send(result.dataValues);
        })
      }
    });
  })

router
  .route('/list')
  .get((req, res) => {
    Controller.login().then(result => res.send(result));
  })

router
  .route('/logout')
  .post((req, res) => {
    res.send("teste");
  })

module.exports = router;