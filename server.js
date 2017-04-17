// Project 2: Dance Portfolio
// server.js file
// require package
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var currentUser = 'unknown';

// middleware
app.use(session({
  secret:"loggedinthedanceportfolio",
  resave: false,
  saveUninitialized:false
}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));


// route controller
var sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);
var usersController = require('./controllers/users.js');
app.use('/users', usersController);
var dancesController = require('./controllers/dances.js');
app.use('/dances', dancesController);
var seedController = require('./controllers/seed.js')
app.use('/seed', seedController);

// Mongoose Db
mongoose.connect('mongodb://localhost:27017/danceportfolio');
mongoose.connection.once('open', function(){
  console.log('Project 2 Dance Portfolio connect to mongo db');
});


app.get('/', function(req,res){
  if (req.session.loggedInUser){
    currentUser = req.session.loggedInUser
  }
  res.render('index.ejs', {
     currentUser: currentUser
  });
});


app.listen(3000, function(){
  console.log('Project 2 Dance Portfolio Listen');
});
