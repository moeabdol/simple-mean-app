var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  body: String,
  createdAt: { type: Date, default: Date.now },
  author: String,
  published: { type: Boolean, default: false },
  meta: {
    likes: Number
  }
});

module.exports = mongoose.model("Post", PostSchema);
