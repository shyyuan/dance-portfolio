// Project 2: Dance Portfolio
// controller/users.js file

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var bcrypt = require('bcrypt');
var currentUser = 'unknown';

// default user index page (list all users)
router.get('/', function(req,res){
  if (req.session.loggedInUser){
    currentUser = req.session.loggedInUser
  }
  User.find({}, function(err, dbUsers){
    res.render('users/index.ejs', {
      allUsers: dbUsers,
      currentUser: currentUser
    });
  });
});

//  Create New user page (Register)
router.get('/new', function(req,res){
  res.render('users/new.ejs',{
    currentUser: currentUser
  });
});

// Create account in db
router.post('/', function(req, res){
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, function(err, createdUser){
    // auto sign in and send to dances index page
    req.session.loggedInUser = createdUser;
    res.redirect('/dances');
  });
});

// Read one user
router.get('/:id', function(req,res){
  if (req.session.loggedInUser){
    currentUser = req.session.loggedInUser
  }
  User.findById(req.params.id, function(err, dbRecord){
    res.render('users/show.ejs',{
      user: dbRecord,
      currentUser:currentUser
    });
  });
});

// Only logged In user can edit his profile
router.get('/:id/edit', function(req, res){
  if (req.session.loggedInUser){
    currentUser = req.session.loggedInUser
  }
  if (currentUser === 'unknown'){
    res.redirect('/sessions/new');
  } else {
    User.findById(req.params.id, function(err, dbRecord){
      res.render('users/edit.ejs',{
        user: dbRecord,
        currentUser:currentUser
      });
    });
  }
});


module.exports = router;
