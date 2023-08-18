const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const router = express.Router();

router.get("/user/:id", (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then(user => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id, name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          return res.status(200).json({ user, posts });
        });
    })
    .catch(err => {
      return res.status(404).json({ error: "User not found" });
    });
});

router.put("/follow", requireAuth, (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.followId, //ID to be followed will be provided from client side
    {
      $push: { follers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) return res.status(422).json({ error: err });
      User.findByIdAndUpdate(
        //update the list of people the user is following
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      );
    }
  )
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      return res.status(422).json({ error: err });
    });
});

router.put("/unfollow", requireAuth, (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) return res.status(422).json({ error: err });
      User.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: req.body.unfollowId } },
        { new: true }
      );
    }
  )
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(err => {
      return res.status(422).json({ error: err });
    });
});

router.put("/updatepicture", requireAuth, (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) return res.status(422).json({ error: err });
      res.status(200).json(result);
    }
  );
});

module.exports = router;
