const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const protect = require("../middleware/auth");
router
  .route("/")
  .get(postController.getAllPosts)
  .post(protect, postController.createPosts);
router
  .route("/:id")
  .get(postController.getOnePosts)
  .patch(postController.updatePosts);
module.exports = router;
