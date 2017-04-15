// Project 2: Dance Portfolio
// controller/dances.js file

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Dance = require('../models/dance.js');
var Comments = require('../models/comment.js');

router.get('/', function(req, res){
	Dance.find({}, function(err, dbDances){
		res.render('dances/index.ejs', {
			allDances: dbDances
		});
	});
});

//  Create New Dance posting page
router.get('/new', function(req,res){
  res.render('dances/new.ejs');
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
  Dance.findById(req.params.id, function(err, dbRecord){
    res.render('dances/show.ejs',{
      dance: dbRecord
    });
  });
});




module.exports = router;
