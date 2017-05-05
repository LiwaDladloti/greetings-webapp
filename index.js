var express = require('express');
var app = express();

var greetedNames = [];

app.listen(3000, function () {
	console.log('Server running on port 3000');
});

app.get('/greetings/:name', function(req, res){
	console.log(req.params.name);
	res.send('Hello, ' + req.params.name);
	greetedNames.push(req.params.name);
});
app.get('/greeted', function(req, res){
	console.log('Showing greeted Names');
	res.send('These are greeted names: ' + greetedNames);
});


