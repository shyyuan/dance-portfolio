// Project 2: Dance Portfolio
// controller/dances.js file

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Dance = require('../models/dance.js');
var Comments = require('../models/comment.js');
var currentUser = 'unknown';

// default dances index page
router.get('/', function(req, res){
  if (req.session.loggedInUser){
    currentUser = req.session.loggedInUser
  }
  Dance.find({}, function(err, dbDances){
		res.render('dances/index.ejs', {
			allDances: dbDances,
      currentUser: currentUser
		});
	});
});

//  Create New Dance posting page
router.get('/new', function(req,res){
  if (req.session.loggedInUser){
    currentUser = req.session.loggedInUser
  }
  // only logged in user can post new dance
  if (currentUser === 'unknown'){
    res.redirect('/sessions/new');
  } else {
    res.render('dances/new.ejs',{
      currentUser: currentUser
    });
  }
});

// Create new dance record in db
router.post('/', function(req, res){
  console.log(req.body);
  Dance.create(req.body, function(err, createdRecord){
    res.redirect('/dances')
  });
});

// Read one dance posting
router.get('/:id', function(req,res){
  if (req.session.loggedInUser){
    currentUser = req.session.loggedInUser
  }
  Dance.findById(req.params.id, function(err, dbRecord){
    res.render('dances/show.ejs',{
      dance: dbRecord,
      currentUser: currentUser
    });
  });
});




module.exports = router;
