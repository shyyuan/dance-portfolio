// Project 2: Dance Portfolio
// model/comment.js file
var mongoose = require('mongoose');
var User = require('./user.js');


// comment schema
var commentSchema = mongoose.Schema({
  comments: String,
  dancePiece: {type: mongoose.Schema.Types.ObjectId, ref: 'Dance'},
  postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;
