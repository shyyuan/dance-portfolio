// Project 2: Dance Portfolio
// controller/sessions.js file

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var bcrypt = require('bcrypt');
var currentUser = 'unknown';

// New Session Page (Sign In)
router.get('/new', function(req,res){
  res.render('sessions/new.ejs', {
    currentUser:currentUser
  });
});

//
router.post('/', function(req, res){
  User.findOne({username:req.body.username}, function(err, foundUser){
    if (bcrypt.compareSync(req.body.password,foundUser.password)){
      req.session.loggedInUser = foundUser;
      res.redirect('/dances');
    } else {
      res.send('username/password are not match');
    }
  });
});

// default dances index page
router.get('/', function(req, res){
  if (req.session.loggedInUser){
    currentUser = req.session.loggedInUser
  }
  res.render('/index.ejs', {
    currentUser:currentUser
  });
});

// Sign out
router.get('/:id/delete', function(req, res){
    req.session.destroy(function(){
      res.redirect('/');
    });
});

module.exports = router;
