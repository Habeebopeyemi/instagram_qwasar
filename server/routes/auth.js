const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("hello");
});

router.post("/signup", (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res.status(422).json({ error: "please add all the fields" });
  }
    res.json({message:"successfully posted"})
});

module.exports = router;
