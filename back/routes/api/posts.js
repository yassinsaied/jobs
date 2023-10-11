const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const router = express.Router();

// @route Post api/posts
// @desc  add poste by user
// @access private

router.post(
  "/",
  [
    auth,
    [check("text").not().isEmpty().withMessage("Text of post is required")],
  ],
  async (req, res) => {
    //validate Post
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      res.send("Server Error");
    }
  }
);

// @route Get  api/posts
// @desc  Get ALL postes
// @access private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find({ archived: false }).sort({
      datecomment: -1,
    });
    res.json(posts);
  } catch (error) {
    res.send("Server Error");
  }
});

// @route Put  api/posts/:id_post
// @desc  update Post
// @access private

router.put(
  "/:id_post",
  [
    auth,
    [check("text").not().isEmpty().withMessage("text of post is required")],
  ],
  async (req, res) => {
    //validate Post
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.id_post, user: req.user.id },
        {
          text: req.body.text,
          updatedAt: Date.now(),
        },
        { new: true }
      );
      if (post) {
        res.json(post);
      } else {
        res.status(400).json({ errorMessage: "post Not Found" });
      }
    } catch (error) {
      if (error.kind == "ObjectId") {
        return res.status(400).json({ errorMessage: "this Id is not valid" });
      }
      console.log(error);
      res.send("Server Error");
    }
  }
);

// @route Put  api/posts/delete/:id_post
// @desc  arshive post
// @access private

router.put("/delete/:id_post", auth, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id_post, user: req.user.id },
      { isArchived: true },
      { new: true }
    );
    if (post) {
      res.json("Post Removed");
    } else {
      res.status(400).json({ errorMessage: "post Not Found" });
    }
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json({ errorMessage: "this Id is not valid Id" });
    }
    console.log(error);
    res.send("Server Error");
  }
});

// @route Put  api/posts/like/:id_post
// @desc like deslike post
// @access private

router.put("/like/:id_post", auth, async (req, res) => {
  try {
    // const post = await Post.findById(req.params.id_post);
    // const isLiked = post.likes.find((like) => like.user.toString() === req.user.id);
    // const Newpost = await Post.findOneAndUpdate(
    //   { _id: req.params.id_post },
    //   { pullAll: { likes: { user: req.user.id } } },
    //   { new: true }
    // );

    const post = await Post.findById(req.params.id_post);
    if (post) {
      const isLiked = post.likes.find(
        (like) => like.user.toString() === req.user.id
      );

      //chek if user adrealy liked
      if (isLiked) {
        post.likes = post.likes.filter((like) => {
          like.user.toString() === req.user.id;
        });
      } else {
        post.likes.unshift({ user: req.user.id });
      }

      await post.save();
      res.json(post.likes);
    } else {
      res.status(400).json({ errorMessage: "post Not Found" });
    }
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json({ errorMessage: "this Id is not valid" });
    }
    console.log(error);
    res.send("Server Error");
  }
});

// @route Put  api/posts/comment/:id_post
// @desc comment to post
// @access private

router.put(
  "/comment/:id_post",
  [auth, [check("text").not().isEmpty().withMessage("text is required")]],
  async (req, res) => {
    //validate Post
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.id_post);
      if (post) {
        const newComment = {
          text: req.body.text,
          name: req.user.name,
          avatar: req.user.avatar,
          user: req.user.id,
        };

        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
      } else {
        res.status(400).json({ errorMessage: "post Not Found" });
      }
    } catch (error) {
      if (error.kind == "ObjectId") {
        return res
          .status(400)
          .json({ errorMessage: "this Id is not valid Id" });
      }
      console.log(error);
      res.send("Server Error");
    }
  }
);

router.put("/comment/:id_post/:id_comment", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id_post);
    if (post) {
      const commentIndex = post.comments.findIndex(
        (comm) => comm._id.toString() === req.params.id_comment
      );

      if (post.comments[commentIndex]) {
        console.log(commentIndex);
        post.comments[commentIndex].isArchived = true;
        await post.save();
        const activeComments = post.comments.filter((comm) => {
          return comm.isArchived === false;
        });
        res.json(activeComments);
      } else {
        res.status(400).json({ errorMessage: "comment Not Found" });
      }
    } else {
      res.status(400).json({ errorMessage: "Post Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
});

module.exports = router;
