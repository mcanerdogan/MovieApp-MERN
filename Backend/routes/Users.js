const express = require("express");
const users = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");

const User = require("../models/User");
users.use(cors());

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
          const sess = req.session;
          console.log(sess);
          const { username, password } = req.body;
          sess.username = username;
          sess.password = password;
          res.json({ data: sess, result: "success" });
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

users.post("/logout", (req, res) => {
  console.log("session++" + JSON.stringify(req.session));
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
  });
});

module.exports = users;
