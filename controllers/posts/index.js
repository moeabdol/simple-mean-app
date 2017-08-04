var base = process.env.PWD;
var Post = require(base + "/models/post")

var getPosts = function(req, res) {
  Post.find(function(err, posts) {
    if (err) { res.send(500, err); }
    res.json(200, posts);
  });
};

var createPost = function(req, res) {
  var post = new Post(req.body);
  post.save(function(err, post) {
    if (err) { res.send(500, err); }
    res.json(200, post);
  });
};

module.exports = {
  getPosts,
  createPost
};
