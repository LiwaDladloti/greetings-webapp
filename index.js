var express = require('express');
var app = express();

var greetedNames = [];

app.listen(3000, function () {
	console.log('Server running on port 3000');
});

app.get('/greetings/:name', function(req, res){
	var name = req.params.name
	console.log(name);
	res.send('Hello, ' + name);
	greetedNames.push(name);
});

app.get('/greeted', function(req, res){
	console.log('Showing greeted Names');
	res.send('These are greeted names: ' + greetedNames);
});
app.get('/counter/:user', function (req, res) {
	var user = req.params.user
	var uniqNames = {};
	for(var i = 0; i < greetedNames.length; i++) {
		var greets = greetedNames[i];
		uniqNames[greets] = uniqNames[greets] ? uniqNames[greets] + 1 : 1;
	}
console.log(uniqNames[user]);
res.send('Hello, ' + user + ' has been greeted ' + JSON.stringify(uniqNames[user]) + ' time(s)');
});
