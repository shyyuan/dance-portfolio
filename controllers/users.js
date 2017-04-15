// Project 2: Dance Portfolio
// controller/user.js file

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

// default user index page (list all users)
router.get('/', function(req,res){
  User.find({}, function(err, dbUsers){
    res.render('users/index.ejs', {
      allUsers: dbUsers
    });
  });
});

//  Create New user page (Register)
router.get('/new', function(req,res){
  res.render('users/new.ejs');
});

// Create account in db
router.post('/', function(req, res){
  User.create(req.body, function(err, createdUser){
    // to sign in page later
    res.redirect('/users');
  });
});


module.exports = router;
