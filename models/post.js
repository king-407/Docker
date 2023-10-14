const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Post should have title"],
  },
  body: {
    type: String,
    required: [true, "body daalo"],
  },
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
