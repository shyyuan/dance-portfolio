// Project 2: Dance Portfolio
// controller/users.js file

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Dance = require('../models/dance.js');
var bcrypt = require('bcrypt');
var currentUser = 'unknown';

// default user index page (list all users)
router.get('/', function(req,res){
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
  }
  Dance.find({},function(err, results){
    var postedByArr = [];
    for (i=0;i<results.length; i++){
      postedByArr.push(results[i].postedBy);
    }
    console.log(postedByArr);
    User.find().where('_id').in(postedByArr).exec(function(err, dbUsers){
      console.log(dbUsers);
      res.render('users/index.ejs', {
        allUsers: dbUsers,
        currentUser: currentUser
      });
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
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
  }
  User.findById(req.params.id, function(err, dbRecord){
    Dance.find({postedBy: req.params.id}, function(err, dbDances){
      res.render('users/show.ejs',{
        user: dbRecord,
        currentUser:currentUser,
        dances: dbDances
      });
    });
  });
});

// Only logged In user can edit his profile
router.get('/:id/edit', function(req, res){
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
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

// Update profile in DB
router.put('/:id', function(req, res){
  // console.log('edit profile: '+req.session.loggedInUser);
  // if (req.session.loggedInUser !== undefined){
  //   currentUser = req.session.loggedInUser
  // } else {
  //   currentUser = 'unknown';
  // }
  // if (currentUser === 'unknown' || currentUser.id !== req.params.id){
  //   res.redirect('/sessions/new');
  // } else {
    if (req.body.action === 'Cancel'){
      res.redirect('/users');
    } else {
      User.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, response){
        res.redirect('/users');
      });
    }
  //}
});

module.exports = router;
