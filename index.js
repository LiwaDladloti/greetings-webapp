var express = require('express');
var exphbs  = require('express-handlebars');
var body_parser = require('body-parser');
var app = express();
app.use(express.static('public'));

app.use(body_parser.urlencoded({ extended: false}))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var greetedNames = [];


app.get('/', function (req, res) {
	res.render('index');
});

app.post('/', function(req, res){
	var name = req.body.name
//	console.log(name);
	greetedNames.push(name);
	var language = req.body.language;
//	console.log(req.body)

	if (language === 'English') {
		res.render('index', {msg: 'Hello, ', name: name});
	} else if (language === 'isiXhosa') {
		res.render('index', {msg: 'Molo, ',  name: name});
	} else if (language === 'Latin') {
		res.render('index', {msg: 'Salve, ', name: name});
	}

});

app.listen(3000, function () {
	console.log('Server running on port 3000');
});

//app.get('/greeted', function(req, res){
//	console.log('Showing greeted Names');
//	res.send('These are greeted names: ' + greetedNames);
//});
//
//app.get('/counter/:user', function (req, res) {
//	var user = req.params.user
//	var uniqNames = {};
//	for(var i = 0; i < greetedNames.length; i++) {
//		var greets = greetedNames[i];
//		uniqNames[greets] = uniqNames[greets] ? uniqNames[greets] + 1 : 1;
//	}
//console.log(uniqNames[user]);
//res.send('Hello, ' + user + ' has been greeted ' + JSON.stringify(uniqNames[user]) + ' time(s)');
//});
