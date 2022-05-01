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
          req.session.loggedUser = user.name;
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
          req.session.loggedUser = result.dataValues.name;
          console.log(req.session);
          res.send(result.dataValues);
          return;
        })
      }
    });
  })

router
  .route('/check')
  .post((req, res) => {
    console.log(req.session)
    console.log(!req.session.loggedUser)
  })

router
  .route('/logout')
  .post((req, res) => {
    req.session.destroy();
    console.log(req.session);
    res.status(200).send('Logged out.');
  })

module.exports = router;