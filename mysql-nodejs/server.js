// Required frame works
var express = require('express');
var app = express(); 
var connection  = require('express-myconnection'); 
var mysql = require('mysql');
var connection  = require('express-myconnection'); 
var mysql = require('mysql');

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

app.get('/', function (req, res) {
	console.log('Request Type:', req.method);
    res.send("<a href='/users'>Show Users</a>");
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
                res.json(rows[0]);
             });         
         console.log(query.sql);
    });   
})


app.listen(80);
