const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");

const Post = mongoose.model("Post");
const User = mongoose.model("User");
const router = express.Router();

router.get("/allposts", requireAuth, (req, res, next) => {
  Post.find()
    .populate("postedBy", "_id, name")
    .populate("comments.postedBy", "_id, name")
    .then(posts => {
      return res
        .status(200)
        .json({ message: "posts retrieved successfully", posts });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/followingposts", requireAuth, (req, res, next) => {
  Post.find({ postedBy: { $in: req.user.following } }) //return posts made by the users i am following
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .then(posts => {
      return res
        .status(200)
        .json({ message: "posts retrieved successfully", posts });
    })
    .catch(err => {
      return res.status(422).json({ error: err });
    });
});

router.get("/myposts", requireAuth, async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await Post.find({ postedBy: req.user._id })
      .populate("postedBy", "_id name email followers following")
      .exec();
    if (!posts) return res.status(422).json({ error: "Unprocessible entity" });

    return res
      .status(200)
      .json({ message: "my posts retieved successfully", user, posts });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/createpost", requireAuth, (req, res, next) => {
  const { title, body, pic_url } = req.body;
  if (!title || !body || !pic_url)
    return res.status(422).json({ error: "please input all the fields" });
  req.user.password = undefined;
  const post = new Post({
    title: title,
    body: body,
    photo: pic_url,
    postedBy: req.user,
  });
  post
    .save()
    .then(result => {
      return res.status(201).json({ message: "post successful", post: result });
    })
    .catch(err => console.log(err));
});

router.put("/like", requireAuth, async (req, res, next) => {
  // postId will be sent from the client side, then set the last option with new being true to receive updated data
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    ).exec();

    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(result);
  } catch (error) {
    return res.status(422).json({ error: error });
  }
});

router.put("/unlike", requireAuth, async (req, res, next) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).exec();
    res.json(result);
  } catch (error) {
    return res.status(422).json({ error: error });
  }
});

router.put("/comment", requireAuth, async (req, res, next) => {
  const comment = {
    text: req.body.text, //text comes from user payload
    postedBy: req.user._id,
  };
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId, //postId will be sent from client side
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id, name")
      .exec();
    res.json(result);
  } catch (error) {
    return res.status(422).json({ err: error });
  }
});

router.delete("/deletepost/:postId", requireAuth, async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId })
      .populate("postedBy", "_id")
      .exec();
    if (!post) {
      return res.status(422).json({ err: "sorry this post does not exist" });
    }
    if (post.postedBy._id.toString() === req.user._id.toString()) {
      await Post.findByIdAndRemove(req.params.postId);
      return res.status(200).json({ message: "post deleted successfully" });
    } else {
      return res.status(403).json({ err: "Unauthorized to delete this post" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal server error" });
  }
});

module.exports = router;
