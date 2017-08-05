process.env.NODE_ENV = "test";

var base      = process.env.PWD;
var config    = require(base + "/config");
var mongoose  = require("mongoose");
var posts     = require(base + "/controllers/posts");
var Post      = require(base + "/models/post");
var should    = require("should");
var testUtils = require(base + "/test/utils");

describe("Post API", function() {
  var dummyPost, id;

  before(function(done) {
    mongoose.connect(config.testDb, function() {
      console.log("Connected to: ", config.testDb);
      done();
    });

    dummyPost = new Post({
      "title": "dummy",
      "author": "someone",
      "body": "lorem ipsum dior"
    });

    dummyPost.save(function(err, post) {
      if (err) { console.log(err); }
      id = post._id;
    });
  });

  describe("POST /posts", function() {
    it("should create a new post", function(done) {
      var req = {
        body: {
          "title": "Blah blah",
          "body": "Again blah blah blah"
        }
      };

      var res = testUtils.responseValidator(200, function(post) {
        post.should.have.property("title");
        post.title.should.equal("Blah blah");
        post.should.have.property("body");
        post.body.should.equal("Again blah blah blah");
        done();
      });

      posts.createPost(req, res);
    });
  });

  describe("GET /posts", function() {
    it("should get all posts", function(done) {
      var req = {};

      var res = testUtils.responseValidator(200, function(posts) {
        posts.length.should.equal(2);
        done();
      });

      posts.getPosts(req, res);
    });
  });

  describe("GET /posts/:id", function() {
    it("should get post by id", function(done) {
      var req = {
        params: {
          id: id
        }
      };

      var res = testUtils.responseValidator(200, function(post) {
        post.should.have.property("title");
        post.title.should.equal("dummy");
        post.should.have.property("author");
        post.author.should.equal("someone");
        post.should.have.property("body");
        post.body.should.equal("lorem ipsum dior");
        done();
      });

      posts.getPost(req, res);
    });

    it("should throw error if post doesn't exist", function(done) {
      var req = {
        params: {
          id: "gibberish"
        }
      };

      var res = testUtils.responseValidator(500, function(err) {
        done();
      });

      posts.getPost(req, res);
    });
  });

  after(function(done) {
    Post.remove({}, function(err) {
      if (err) { console.log(err); }
    });
    mongoose.disconnect(done);
  });
});
