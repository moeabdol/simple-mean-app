var base = process.env.PWD;
var Post = require(base + "/models/post")

var getPost = function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(200, post);
    }
  });
};

var getPosts = function(req, res) {
  Post.find(function(err, posts) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(200, posts);
    }
  });
};

var createPost = function(req, res) {
  var post = new Post(req.body);
  post.save(function(err, post) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(200, post);
    }
  });
};

var updatePost = function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      res.send(500, err);
    } else {
      if (req.body.title)     { post.title     = req.body.title; }
      if (req.body.body)      { post.body      = req.body.body; }
      if (req.body.author)    { post.author    = req.body.author; }
      if (req.body.published) { post.published = req.body.published; }
      post.save(function(err, post) {
        if (err) {
          res.send(500, err);
        } else {
          res.json(200, post);
        }
      });
    }
  });
};

var deletePost = function(req, res) {
  Post.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(200, { "deleted": true });
    }
  });
}

module.exports = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost
};
