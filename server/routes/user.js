const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const router = express.Router();

router.get("/user/:id", requireAuth, async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await Post.find({ postedBy: req.params.id })
      .populate("postedBy", "_id name")
      .exec();
    if (!posts) {
      return res.status(422).json({ error: err });
    }
    return res.status(200).json({ user, posts });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/follow", requireAuth, async (req, res, next) => {
  try {
    const followedUser = await User.findByIdAndUpdate(
      req.body.followId, //ID to be followed will be provided from client side
      {
        $addToSet: { followers: req.user._id },
      },
      { new: true }
    );
    if (!followedUser)
      return res.status(422).json({ error: "User to follow not found" });
    const currentUser = await User.findByIdAndUpdate(
      //update the list of people the user is following
      req.user._id,
      {
        $addToSet: { following: req.body.followId },
      },
      { new: true }
    ).select("-password");
    if (!currentUser)
      return res.status(422).json({ error: "Current user not found" });

    res.status(200).json({ result: currentUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put("/unfollow", requireAuth, async (req, res, next) => {
  try {
    const unfollowedUser = await User.findByIdAndUpdate(
      req.body.followId, //ID to be followed will be provided from client side
      {
        $pull: { followers: req.user._id },
      },
      { new: true }
    );
    if (!unfollowedUser)
      return res.status(422).json({ error: "User to follow not found" });
    const currentUser = await User.findByIdAndUpdate(
      //update the list of people the user is following
      req.user._id,
      {
        $pull: { following: req.body.followId },
      },
      { new: true }
    );
    if (!currentUser)
      return res.status(422).json({ error: "Current user not found" });

    res.status(200).json({ result: currentUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
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
