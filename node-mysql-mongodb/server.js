// Required frame works
var express = require('express');
var app = express(); 
var connection  = require('express-myconnection');// Mysql orm
var mysql = require('mysql');// Mysql orm
var mongoose = require('mongoose');// Mongo orm

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/
app.use(    
    connection(mysql,{        
        host: 'localhost',
        user: 'root',
        password : 'password',
        port : 3306, //port mysql
        database:'ngbird'
    },'pool') //or single
);


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


app.get('/mysq2mongo', function (req, res) {
	req.getConnection(function(err,connection){       
        var query = connection.query('SELECT * FROM ngbird.user',function(err,rows)
        {            
            if(err)
                console.log("Error Selecting : %s ",err );   
            var data = JSON.parse(JSON.stringify(rows));
            console.log(data); 
            
            user = new User({id : data[0].id});
            user.save();
            User.find({},function (err, user) {
                  if (err) return console.error(err);
                  console.log(user)
                  res.json(user);
            })
         });         
         console.log(query.sql);
    });   
})


app.get('/mongo2mysql', function (req, res) {
	req.getConnection(function(err,connection){       
        var query = connection.query('SELECT * FROM ngbird.user',function(err,rows)
        {            
            if(err)
                console.log("Error Selecting : %s ",err );   
            var data = JSON.parse(JSON.stringify(rows));
            console.log(data); 
            res.send("<div>"+data+"</div>");
         });         
         console.log(query.sql);
    });   
})

app.get('/', function (req, res) {
	console.log('Request Type:', req.method);
    res.send("<a href='/users'>Show Users</a><a href='/mysq2mongo'>mysq2mongo</a><a href='/mongo2mysql'>mongo2mysql</a>");
})

app.get('/users', function (req, res) {
	req.getConnection(function(err,connection){       
        var query = connection.query('SELECT * FROM ngbird.user',function(err,rows)
        {            
            if(err)
                console.log("Error Selecting : %s ",err );   
            var data = JSON.parse(JSON.stringify(rows));
            console.log(data); 
            res.send("<div>"+data+"</div>");
         });         
         console.log(query.sql);
    });   
})

app.get('/users/:id', function (req, res) {
    console.log(req.params.id);
	req.getConnection(function(err,connection){ 
        if(req.params.id)
            var query = connection.query('SELECT name FROM ngbird.user where id = ?', [req.params.id],function(err,rows)
            {            
                if(err)
                    console.log("Error Selecting : %s ",err );   
                var data = JSON.stringify(rows);
                console.log(data); 
                res.send("<div>"+data+"</div>");
             });         
         console.log(query.sql);
    });   
})


app.listen(80);
