// Project 2: Dance Portfolio
// model/dance.js file
var mongoose = require('mongoose');
var Comments = require('./comment.js');
var User = require('./user.js');


// dance schema
var danceSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, require: true},
  postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  img: {type: String, required: true},
  video: {type: String, required: true},
  likes: Number,
  comments: [Comments.schema]
});

var Dance = mongoose.model('Dance', danceSchema);

module.exports = Dance;
