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
      console.log(!result);
      if (!result) {
        console.log('asdsad');
        bcrypt.hash(user.password, saltRounds, (err, hash) => {
          user.password = hash;
          Controller.store(user, res).then(result => res.send(result));
          return;
        })
      } else {
        res.status(400).send({ email: 'Email already taken.' });
        return;
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
        return;
      } else {
        bcrypt.compare(user.password, result.dataValues.password, (err, equal) => {
          if (!equal) {
            res.status(400).send({ password: 'Incorrect password.' });
            return;
          }
          res.send(result.dataValues);
          return;
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