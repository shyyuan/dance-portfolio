// Project 2: Dance Portfolio
// server.js file
// require package
var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/danceportfolio';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
//var currentUser = req.session.loggedInUser || 'unknown';

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
mongoose.connect(mongoDBURI);
mongoose.connection.once('open', function(){
  console.log('Project 2 Dance Portfolio connect to mongo db');
});


app.get('/', function(req,res){
  if (req.session.loggedInUser !== undefined){
    currentUser = req.session.loggedInUser
  } else {
    currentUser = 'unknown';
  }
  res.render('index.ejs', {
     currentUser: currentUser
  });
});


app.listen(port, function(){
  console.log('Project 2 Dance Portfolio Listen');
});
