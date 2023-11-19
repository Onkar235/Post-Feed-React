// backend/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userName: String,
  text: String,
  comments: [{ userName: String, text: String }],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
