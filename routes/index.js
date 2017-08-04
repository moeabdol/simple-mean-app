var express = require('express');
var router = express.Router();

var base = process.env.PWD;
var posts = require(base + "/controllers/posts");

router.get("/posts/:id", posts.getPost);
router.get("/posts", posts.getPosts);
router.post("/posts", posts.createPost);
router.put("/posts/:id", posts.updatePost);
router.delete("/posts/:id", posts.deletePost);

module.exports = router;
