// Project 2: Dance Portfolio
// model/user.js file
var mongoose = require('mongoose');

// user schema
var userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  displayName: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
