MONGO+EXPRESSJS+NODEJS
======================
	Sample configuration for nodejs middleware for REST api (GET and POST only)
	Require npm modules:
		mongoose : TO connect to mongo db mongoose driver is used
		express : For rouiting
		body-parser : Get data from request body
		
	Configurations :
		mongodb is installed in : 127.0.0.1 
		and port : 27017
		db name : test
		Mongo schema : User = {name : String}
		
	How to use :
	
	Method 1 : If nodejs is installed globalle
		a. Startd mongodb
		b. In comand prompt navigate to serverjs
		c. Run -> node 
			## Usage
			```js
			server.js
	Method 2 : If nodejs is not instaled then download node.exe file and paste exe file in the downloaded project and proceed to method1
	
	Output :
	
	Rest api servies :
	
	GET - http://localhost/api/users - list of users
	
	GET - http://localhost/api/users/userId - selected user details [WIP]
	
	POST - http://localhost/api/users - create a user
	
	 
	
	
	