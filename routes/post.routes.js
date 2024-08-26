const express = require("express");
const {
  setPost,
  getPost,
  setEdit,
  deletePost,
  likePost,
  dislikePost,
} = require("../controllers/post.controller");
const router = express.Router();

router.get("/", getPost);
router.post("/", setPost);
router.put("/:id", setEdit);
router.delete("/:id", deletePost);
router.patch("/like-post/:id", likePost);
router.patch("/dislike-post/:id", dislikePost);

module.exports = router;
