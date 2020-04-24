// Imports

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Secret

const { jwtSecret } = require('../config/secrets.js');
// Model

const Users = require('../users/users-model');

// CRUD

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user)

        console.log(user)
        res.status(200).json({ token });
      } else { 
        res.status(401).json({ error: "Invalid Credentials" });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

function signToken(user) {
  const payload = {
    userId: user.id,
    username: user.name
  };

  const options = {
    expiresIn: "5d"
  };

  return jwt.sign(payload, jwtSecret, options)
};

module.exports = router;