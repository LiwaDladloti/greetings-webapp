var express = require('express');
var body_parser = require('body-parser');
var app = express();
app.use(express.static('public'));
app.use(body_parser.urlencoded());

var greetedNames = [];

app.listen(3000, function () {
	console.log('Server running on port 3000');
});

app.post('/greeting', function(req, res){
	var name = req.body.name
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
