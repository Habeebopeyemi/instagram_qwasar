const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
const User = mongoose.model("User");

router.post("/signup", (req, res, next) => {
  const { name, email, password, pic } = req.body;
  if (!email || !password || !name) {
    res.status(422).json({ error: "please add all the fields" });
  }
  User.findOne({ email: email })
    .then(user => {
      if (user)
        return res
          .status(422)
          .json({ error: "user already exist with that email" });
      bcrypt.hash(password, 12).then(hashed_password => {
        const new_user = new User({
          email: email,
          password: hashed_password,
          name: name,
          pic,
        });
        new_user
          .save()
          .then(user => {
            res.status(200).json({ message: "signup successfully" });
          })
          .catch(err => {
            console.log(err);
          });
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(422)
      .json({ error: "please add valid email or password" });

  User.findOne({ email: email }).then(user => {
    if (!user) return res.status(422).json({ error: "invalid email or password" });
    bcrypt
      .compare(password, user.password)
      .then(onFulfilled => {
        if (onFulfilled) {
          const token = jwt.sign({ _id: user._id }, JWT_SECRET);
          const { _id, name, email, followers, following, pic } = user;
          return res.status(200).json({
            message: "sign in successful",
            token: token,
            user: { _id, name, email, followers, following, pic },
          });
        } else {
          return res.status(422).json({ error: "invalid email or password" });
        }
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;
