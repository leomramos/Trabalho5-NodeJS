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
      if (!result) {
        bcrypt.hash(user.password, saltRounds, (err, hash) => {
          user.password = hash;
          Controller.store(user, res).then(result => res.send(result));
          return;
        })
      } else {
        res.status(400).send({ error: 'Email already taken.' });
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
        res.status(400).send({ error: 'Email not found.' });
        return;
      } else {
        bcrypt.compare(user.password, result.dataValues.password, (err, equal) => {
          if (!equal) {
            res.status(400).send({ error: 'Incorrect password.' });
            return;
          }
          res.send(result.dataValues);
          return;
        })
      }
    });
  })

module.exports = router;