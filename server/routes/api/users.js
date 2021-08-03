const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check to make sure nobody has already registered with a duplicate email
  User.findOne({ username: req.body.username })
    .then(username => {
      if (username) {
        return res
          .status(400)
          .json({
            username: "Username already taken."
          })
      }
    })
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      // Throw a 400 error if the email address already exists
      return res
        .status(400)
        .json({
          email: "An account with this email has already been registered.",
        });
    } else {
      // Otherwise create a new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cashBalance: 500,
        avatar: {
          current: 'a0',
          owned: ['a0']
        },
        cardBack: {
          current: 'a0',
          owned: ['a0']
        }
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, username: user.username, email: user.email, balance: user.cashBalance, avatar: user.avatar.current, cardBack: user.cardBack.current };

              jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                })
              })
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "This user does not exist" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username, email: user.email, balance: user.cashBalance, avatar: user.avatar.current, cardBack: user.cardBack.current };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
              payload
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

// router.put(`/add`, (req, res) => {

// })

router.get('/get-owned-avatars', (req, res) => {
  User.findOne({ email: req.query.email })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
})

router.post('/purchase-avatar', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      user.cashBalance -= req.body.cost
      user.avatar.owned.push(req.body.id)

      const payload = { id: user.id, username: user.username, email: user.email, balance: user.cashBalance, avatar: user.avatar.current, cardBack: user.cardBack.current }

      user
        .save()
        .then(() => res.json({ payload }))
        .catch((err) => res.status(400).json("Error: " + err))
    })
})

router.post('/recharge', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      user.cashBalance = 500

      const payload = { id: user.id, username: user.username, email: user.email, balance: user.cashBalance, avatar: user.avatar.current, cardBack: user.cardBack.current }

      user
        .save()
        .then(() => res.json({ payload }))
        .catch((err) => res.status(400).json("Error: " + err))
    })
})




module.exports = router;

