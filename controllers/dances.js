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
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
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
  //console.log(req.session.loggedInUser);
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
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
    if (err){
      res.redirect('/dances/new');
    } else {
      res.redirect('/dances');
    }
  });
});

// Read one dance posting
router.get('/:id', function(req,res){
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
  }

  Dance.findById(req.params.id, function(err, dbRecord){
    User.findById(dbRecord.postedBy, function(err, foundUser){
       res.render('dances/show.ejs',{
          dance: dbRecord,
          dancePublisher: foundUser,
          currentUser: currentUser,
      });
    });
  });
});

// edit dance info page
router.get('/:id/edit', function(req, res){
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
  }
  if (currentUser === 'unknown') {
    res.redirect('/sessions/new');
  } else {
    Dance.findById(req.params.id, function(err, dbRecord){
      User.findById(dbRecord.postedBy, function(err, foundUser){
        res.render('dances/edit.ejs',{
          dance: dbRecord,
          user: foundUser,
          currentUser: currentUser
        });
      });
    });
  }
});

// Update DB
router.put('/:id', function(req, res){
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
  }
  if (currentUser === 'unknown') {
    res.redirect('/sessions/new');
  } else {
    Dance.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, updatedRecord){
      res.redirect('/dances/'+req.params.id);
    });
  }
});

// Delete dance posting
router.delete('/:id', function(req, res){
  Dance.findById(req.params.id, function(err, foundDance){
    for (var i=0; i<foundDance.comments.length; i++){
      Comments.findByIdAndRemove(oundDance.comments[i].id, function(){});
    }
    Dance.findByIdAndRemove(req.params.id, function(err, response){
      res.redirect('/dances');
    });
  });
});

// like the posting
router.get('/:id/like', function(req, res){
  Dance.findByIdAndUpdate(req.params.id,
    {$inc: {likes:1}},
    {new:true},
    function(err, response){
      res.redirect('/dances/'+req.params.id);
  });
});


module.exports = router;
