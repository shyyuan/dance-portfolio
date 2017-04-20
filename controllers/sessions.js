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
    currentUser:currentUser,
    screenMessage: 'new'
  });
});

// Check username and password after signed in
router.post('/', function(req, res){
  console.log(req.body);
  User.findOne({username:req.body.username}, function(err, foundUser){
    console.log(foundUser);
    if (foundUser === null ) {
      //res.redirect('/sessions/new')
      //res.render('sessions/failed.ejs');
      res.render('sessions/new.ejs', {
        screenMessage: 'Username/Password are not match.'
      });
    } else {
      if (req.body.password !== null && bcrypt.compareSync(req.body.password,foundUser.password)){
        req.session.loggedInUser = foundUser;
        res.redirect('/');
      } else {
        //res.redirect('/sessions/new')
        //res.render('sessions/failed.ejs');
        res.render('sessions/new.ejs', {
          screenMessage: 'Username/Password are not match.'
        });
      }
    }
  });
});

// default dances index page (home)
router.get('/', function(req, res){
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
  }
  res.render('index.ejs', {
    currentUser:currentUser
  });
});

// Sign out
router.get('/:id/delete', function(req, res){
  req.session.loggedInUser = 'unknown';
  req.session.destroy(function(){
    currentUser = 'unknown';
    res.redirect('/');
    // res.render('index.ejs', {
    //   currentUser: currentUser
    // });
  });
});

module.exports = router;
