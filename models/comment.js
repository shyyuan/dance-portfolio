// Project 2: Dance Portfolio
// model/comment.js file
var mongoose = require('mongoose');
var User = require('./user.js');


// comment schema
var commentSchema = mongoose.Schema({
  comment: String
  postedBy: {type: User.shcema.ObjectId, ref: 'User'}
});

var Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;
