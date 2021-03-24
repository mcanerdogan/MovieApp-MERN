const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    created: today,
  };

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + "Registered!" });
            })
            .catch((err) => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            username: user.username,
            email: user.email,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          return res.status(200).send({ message: "success", token: token });
        } else {
          // Passwords don't match
          res.json({ error: "Şifreler eşleşmiyor" });
        }
      } else {
        res.json({ error: "Böyle bir kullanıcı kayıtlı değil" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = users;
