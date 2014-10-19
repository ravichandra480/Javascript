// Required frame works
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); 

// Instance for express app
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));


// Connect to mogo server db ip : 127.0.0.1 , Port : 27017
var db = mongoose.connect('mongodb://127.0.0.1:27017/user');
var userSchema = mongoose.Schema({
   id:Number,
   name: String,
   address: String,
   email:String,
   phone: String
})
var User = mongoose.model('user', userSchema);

app.get('/', function (req, res) {
	res.send("<a href='/users'>Show Users</a>");
})

app.get('/users', function (req, res) {
		User.find({},function (err, user) {
			  if (err) return console.error(err);
			  console.log(user)
			  res.send(user);
		})
});
app.get('/users/:name', function (req, res) {
	user = new User({id : req.params.name});
	user.save();
	User.find({},function (err, user) {
		  if (err) return console.error(err);
		  console.log(user)
		  res.json(user);
	})	
});

app.listen(80);