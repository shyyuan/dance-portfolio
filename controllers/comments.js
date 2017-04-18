// Project 2: Dance Portfolio
// controller/comments.js file

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Dance = require('../models/dance.js');
var Comments = require('../models/comment.js');
var currentUser = 'unknown';

router.get('/:danceId/new', function(req, res){
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
  }
  Dance.findById(req.params.danceId, function(err, dbRecord){
    User.findById(dbRecord.postedBy, function(err, foundUser){
      res.render('comments/new.ejs',{
        dance: dbRecord,
        user: foundUser,
        currentUser: currentUser
      });
    });
  });
});

module.exports = router;
