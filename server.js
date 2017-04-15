// Project 2: Dance Portfolio
// server.js file
// require package
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
// session middleware

// route controller
var usersController = require('./controllers/users.js');
app.use('/users', usersController);
var seedController = require('./controllers/seed.js')
app.use('/seed', seedController);

// Mongoose Db
mongoose.connect('mongodb://localhost:27017/danceportfolio');
mongoose.connection.once('open', function(){
  console.log('Project 2 Dance Portfolio connect to mongo db');
});

// default (login page)
app.get('/', function(req,res){
  res.render('index.ejs');
  // for later session
  // res.render('index.ejs', {
  //   currentUser: req.session.currentuser
  // });
});




app.listen(3000, function(){
  console.log('Project 2 Dance Portfolio Listen');
});
