// Project 2: Dance Portfolio
// controller/seed.js file
// to provide basic data for testing

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

// only need to visit this route once to create new data
router.get('/newusers', function(req,res){
  var newUsers = [
		{ username: 'Andrew',
      password: 'andrew',
      displayName: 'Andrew'
    },
    { username: 'Bella',
      password: 'bella',
      displayName: 'Bella'
    },
    { username: 'Charlie',
      password: 'charlie',
      displayName: 'Charlie'
    },
    { username: 'David',
      password: 'david',
      displayName:'David'
    },
    { username: 'Emma',
      password: 'emma',
      displayName:'Emma'
    },
  ];

  User.create(newUsers, function(err) {
      console.log("SEED: NEW USERS!");
      res.redirect('/');
  });
});


module.exports = router;
