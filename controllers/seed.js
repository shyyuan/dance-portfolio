// Project 2: Dance Portfolio
// controller/seed.js file
// to provide basic data for testing

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var bcrypt = require('bcrypt');
var Dance = require('../models/dance.js');

// only need to visit this route once to create new data
router.get('/newusers', function(req,res){
  var newUsers = [
		{ username: 'sheila',
      password: 'sheila',
      displayName: 'Sheila'
    },
    { username: 'bella',
      password: 'bella',
      displayName: 'Bella'
    },
    { username: 'emma',
      password: 'emma',
      displayName: 'Emma'
    },
  ];

  for (var i=0; i<newUsers.length; i++){
    newUsers[i].password = bcrypt.hashSync(newUsers[i].password, bcrypt.genSaltSync(10));
    User.create(newUsers[i], function(err, createdUser){});
  }
  res.send('done');
});

router.get('/newdances', function(req,res){

var newDances = [
  { title: 'Jasmine Ballet' ,
    description: 'This ensembles "Jasmine" was performed in the “Stars of Today Meet Stars of Tomorrow” gala at the David H. Koch Theater of Lincoln Center in the New York 2015 YAGP Finals.',
    postedBy: '',
    img: 'http://sbly-web-prod.shareably.netdna-cdn.com/wp-content/uploads/2016/06/29130138/yagp_jasmine_ballet_routine_featured.jpg',
    video: 'https://www.youtube.com/watch?v=_01xGsryxxE',
    likes: 1
  },
  { title: 'Red Fan',
    description: 'Han ethnicity and modern dance with precision of timed waves, geometric formations, leaps, and spins',
    postedBy: '',
    img: 'http://tianyidance.weebly.com/uploads/4/4/9/8/44989205/4407296_orig.jpg',
    video: 'https://www.youtube.com/watch?v=dJrYnHjaFIo',
    likes: 1
  },
  { title:'Playful in the Water',
    description: 'Dai girls live in the southern part of Yunnan Province, where the forest is dense and rivers are beautiful. This dance embodies these Dai girls playing along the riverside.',
    postedBy: '',
    img: 'http://tianyidance.weebly.com/uploads/4/4/9/8/44989205/______1930373_orig.jpg',
    video: 'https://www.youtube.com/watch?v=EN3LtXTPZR8',
    likes: 1
  },
  { title: 'Water Lotus',
    description: 'A 360 degree fan is utilized to show the beauty of the lotus as it moves in the water.',
    postedBy: '',
    img: 'http://tianyidance.weebly.com/uploads/4/4/9/8/44989205/4006676_orig.jpg',
    video: 'https://www.youtube.com/watch?v=UNsrA-feRzA',
    likes: 1
  }
];

  User.find({}, function(err, foundUser){
    for (var i=0; i<foundUser.length-1; i++){
      for (var j=i; j<newDances.length; j=j+2){
        newDances[j].postedBy = foundUser[i]._id;
        Dance.create(newDances[j], function(){});
      }
    }
    res.send('done');
  });
});

module.exports = router;
