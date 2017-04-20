// Project 2: Dance Portfolio
// controller/comments.js file

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Dance = require('../models/dance.js');
var Comments = require('../models/comment.js');
var currentUser = 'unknown';

// Create new comments page
router.get('/:danceId/new', function(req, res){
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
  }
  if (currentUser === 'unknown') {
    res.redirect('/sessions/new');
  } else {
    Dance.findById(req.params.danceId, function(err, dbRecord){
      User.findById(dbRecord.postedBy, function(err, foundUser){
        res.render('comments/new.ejs',{
          dance: dbRecord,
          dancePublisher: foundUser,
          currentUser: currentUser
        });
      });
    });
  }
});
// Insert new comments into DB
router.post('/', function(req,res){
  Dance.findById(req.body.dancePiece, function(err, foundDance){
    User.findById(req.body.postedBy, function(err, foundUser){
      req.body.commentByName = foundUser.displayName;
      Comments.create(req.body, function(err, createdComments){
        foundDance.comments.push(createdComments);
        foundDance.save(function(err,saveComments){
          res.redirect('/dances/'+req.body.dancePiece);
        });
      });
    });
  });
});
// Get data to Edit comments page
router.get('/:id/edit', function(req,res){
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
  }
  if (currentUser === 'unknown') {
    res.redirect('/sessions/new');
  } else {
    Comments.findById(req.params.id, function(err, foundComments){
      Dance.findById(foundComments.dancePiece, function(err, foundDance){
        User.findById(foundDance.postedBy, function(err, foundUser){
          res.render('comments/edit.ejs',{
            comments: foundComments,
            dance: foundDance,
            dancePublisher: foundUser,
            currentUser: currentUser
          });
        });
      });
    });
  }
});

// Update DB
router.put('/:id', function(req,res){
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
  }
  if (currentUser === 'unknown') {
    res.redirect('/sessions/new');
  } else {
    Comments.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, updatedComments){
      Dance.findOneAndUpdate({'comments._id': req.params.id},
      {$set:{'comments.$.comments': req.body.comments}},
      {new:true}, function(err, updatedDance){
        //console.log(updatedDance);
        res.redirect('/dances/'+req.body.dancePiece);

      });
    });
  }
});
// Delete a comment
router.get('/:id/delete', function(req,res){
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
  }
  if (currentUser === 'unknown') {
    res.redirect('/sessions/new');
  } else {
    Comments.findByIdAndRemove(req.params.id, function(){
      Dance.findOne({'comments._id': req.params.id}, function(err, foundDance){
        foundDance.comments.id(req.params.id).remove();
        foundDance.save(function(err,data){
          res.redirect('/dances/'+foundDance.id);
        });
      });
    });
  }
});

module.exports = router;
