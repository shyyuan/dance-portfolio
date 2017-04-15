// Project 2: Dance Portfolio
// controller/dances.js file

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Dance = require('../models/dance.js');
var Comments = require('../models/comment.js');

router.get('/', function(req, res){
  res.send('View All Dances posting')
	// Dance.find({}, function(err, dbDances){
	// 	res.render('dances/index.ejs', {
	// 		allDances: dbDances
	// 	});
	// });
});

//  Create New Dance posting page
router.get('/new', function(req,res){
  res.send('Create New Dancve Posting')
  //res.render('dances/new.ejs');
});

// Create new dance record in db
router.post('/', function(req, res){
  res.send('need data')

});

module.exports = router;
