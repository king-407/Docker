const Post = require("../models/post");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (e) {
    res.status(400).json({ status: "fail" });
  }
};
exports.getOnePosts = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: "success",

      data: {
        post,
      },
    });
  } catch (e) {
    res.status(400).json({ status: "fail" });
  }
};
exports.createPosts = async (req, res, next) => {
  try {
    const posts = await Post.create(req.body);
    res.status(200).json({
      status: "success",

      data: {
        posts,
      },
    });
  } catch (e) {
    res.status(400).json({ status: "fail" });
  }
};
exports.updatePosts = async (req, res, next) => {
  try {
    const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",

      data: {
        posts,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ status: "fail" });
  }
};
