// Project 2: Dance Portfolio
// model/dance.js file
var mongoose = require('mongoose');
var Comments = require('./comment.js');
var User = require('./user.js');


// dance schema
var danceSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: String,
  postedBy: {type: User.shcema.ObjectId, ref: 'User'}
  img: String,
  video: String,
  comments: [Comments.schema]
});

var Dance = mongoose.model('Dance', danceSchema);

module.exports = Dance;
