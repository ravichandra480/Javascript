// Required frame works
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); 

// Instance for express app
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to mogo server db ip : 127.0.0.1 , Port : 27017
var db = mongoose.connect('mongodb://127.0.0.1:27017/test');
app.use('/api', router);
var userSchema = mongoose.Schema({
    name: String
})
var User = mongoose.model('user', userSchema);
router.get('/', function (req, res) {
	res.send("<a href='/api/users'>Show Users</a>");
})
router.get('/users', function (req, res) {
		User.find({},function (err, user) {
			  if (err) return console.error(err);
			  console.log(user)
			  res.send(user);
		})
});
router.get('/users/:name', function (req, res) {
	user = new User({name : req.params.name});
	user.save();
	User.find({},function (err, user) {
		  if (err) return console.error(err);
		  console.log(user)
		  res.json(user);
	})
	
});
router.post('/users', function (req, res) {
	user = new User({name : req.body.name});
	user.save();
	User.find({},function (err, user) {
		  if (err) return console.error(err);
		  console.log(user)
		  res.json(user);
	})	
});
app.listen(80);
