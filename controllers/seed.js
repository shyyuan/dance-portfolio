// Project 2: Dance Portfolio
// controller/seed.js file
// to provide basic data for testing

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var bcrypt = require('bcrypt');

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

  for (var i=0; i<newUsers.length; i++){
    newUsers[i].password = bcrypt.hashSync(newUsers[i].password, bcrypt.genSaltSync(10));
    User.create(newUsers[i], function(err, createdUser){});
  }

});

module.exports = router;
